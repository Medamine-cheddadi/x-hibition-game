import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { challenges, Challenge } from "./challenges";

// --- Graph Theory Logic Helpers ---

// Check if a path is valid (doesn't reuse edges)
const isValidWalk = (path: number[], edges: Edge[]) => {
  const visitedEdges = new Set<string>();
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i+1];
    const edgeId = u < v ? `${u}-${v}` : `${v}-${u}`;
    
    // Check if edge exists in graph
    const exists = edges.some(e => {
        const eId = e.a < e.b ? `${e.a}-${e.b}` : `${e.b}-${e.a}`;
        return eId === edgeId;
    });
    if (!exists) return false;

    // Check if reused
    if (visitedEdges.has(edgeId)) return false;
    visitedEdges.add(edgeId);
  }
  return true;
};

// Check if standard Eulerian Path (Visit all edges once)
const checkEulerian = (path: number[], edges: Edge[], isCycleRequired: boolean) => {
  if (path.length !== edges.length + 1) return false; // Must visit (Edges + 1) nodes
  if (isCycleRequired && path[0] !== path[path.length-1]) return false; // Cycle check
  return isValidWalk(path, edges);
};

// --- Types ---
interface Node { id: number; x: number; y: number; }
interface Edge { id: string; a: number; b: number; }
interface Point { x: number; y: number; }

export default function GraphCycleTool() {
  // Data State
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());
  
  // Game State
  const [isDrawing, setIsDrawing] = useState(false);
  const [path, setPath] = useState<number[]>([]); // The sequence of Node IDs
  const [cursor, setCursor] = useState<Point | null>(null); // Current finger position
  const [activeNode, setActiveNode] = useState<number | null>(null); // Node we are hovering
  
  // UI State
  const [victoryState, setVictoryState] = useState<'none' | 'success' | 'impossible-correct'>('none');
  const svgRef = useRef<SVGSVGElement>(null);

  // --- Geometry Helpers ---
  const getSVGPoint = (e: React.TouchEvent | React.MouseEvent): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    if ('touches' in e && e.touches.length > 0) {
      pt.x = e.touches[0].clientX;
      pt.y = e.touches[0].clientY;
    } else if ('clientX' in e) {
      pt.x = (e as React.MouseEvent).clientX;
      pt.y = (e as React.MouseEvent).clientY;
    }
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const loc = pt.matrixTransform(ctm.inverse());
    return { x: loc.x, y: loc.y };
  };

  const distance = (p1: Point, p2: Point) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  const getNearestNode = (pt: Point, threshold = 45): number | null => {
    let nearest = null;
    let minInfo = threshold;
    for (const node of nodes) {
      const d = distance(pt, node);
      if (d < minInfo) {
        minInfo = d;
        nearest = node.id;
      }
    }
    return nearest;
  };

  // --- Game Loop ---

  const loadChallenge = (c: Challenge) => {
    setCurrentChallenge(c);
    setNodes(c.nodes);
    setEdges(c.edges);
    setPath([]);
    setVictoryState('none');
    setIsDrawing(false);
  };

  const reset = () => {
    setPath([]);
    setVictoryState('none');
    setIsDrawing(false);
    setCursor(null);
    setActiveNode(null);
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!currentChallenge || victoryState !== 'none') return;
    const pt = getSVGPoint(e);
    const nodeId = getNearestNode(pt);
    
    setIsDrawing(true);
    setCursor(pt);
    
    if (nodeId !== null) {
      setPath([nodeId]);
      setActiveNode(nodeId);
    } else {
      setPath([]); // Missed the start node, clear path
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!currentChallenge || !isDrawing || victoryState !== 'none') return;
    // Prevent scrolling on mobile while playing
    if (e.cancelable) e.preventDefault(); 

    const pt = getSVGPoint(e);
    setCursor(pt);
    const nodeId = getNearestNode(pt);
    setActiveNode(nodeId);

    // LOGIC: Adding to path
    if (nodeId !== null && path.length > 0) {
      const lastNode = path[path.length - 1];
      
      // 1. Must be a different node
      if (nodeId !== lastNode) {
        
        // 2. Jitter prevention: Don't allow immediately going back to the node we just came from
        // UNLESS the edge exists twice (multigraph), but for simple graphs, this is good UX.
        const prevNode = path.length > 1 ? path[path.length - 2] : -1;
        if (nodeId === prevNode) return;

        // 3. Check if edge exists
        const edgeExists = edges.some(e => 
          (e.a === lastNode && e.b === nodeId) || (e.a === nodeId && e.b === lastNode)
        );

        if (edgeExists) {
          // 4. Check if edge already used
          const edgeUsed = (() => {
             // Simple check against current path
             // Create temp path
             const tempPath = [...path, nodeId];
             // Count how many times this specific a-b connection appears
             // This allows for complex graphs where you might have parallel edges if your data supports it
             // But simpler: just check valid walk logic
             return !isValidWalk(tempPath, edges);
          })();

          if (!edgeUsed) {
            setPath(prev => [...prev, nodeId]);
          }
        }
      }
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setCursor(null);
    setActiveNode(null);

    // Check Win Condition
    if (currentChallenge && path.length > 1) {
      const isCycle = currentChallenge.type === 'cycle';
      const won = checkEulerian(path, edges, isCycle);
      if (won) {
        setVictoryState('success');
        setCompletedChallenges(prev => new Set(prev).add(currentChallenge.id));
      }
    }
  };

  const handleClaimImpossible = () => {
    if (currentChallenge?.type === 'impossible') {
      setVictoryState('impossible-correct');
      setCompletedChallenges(prev => new Set(prev).add(currentChallenge.id));
    } else {
      alert("Actually, this one IS possible! Keep trying.");
    }
  };

  // --- Render Helpers ---
  const lastNodeObj = nodes.find(n => n.id === path[path.length - 1]);
  const activeNodeObj = nodes.find(n => n.id === activeNode);

  // Calculate used edges for styling
  const getEdgeStatus = (edge: Edge) => {
    let used = false;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i+1];
      if ((u === edge.a && v === edge.b) || (u === edge.b && v === edge.a)) {
        used = true;
        break;
      }
    }
    return used ? 'used' : 'default';
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans select-none overflow-hidden">
      
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-gray-800 text-lg">Eulerian Path</h1>
          <p className="text-xs text-gray-500">
            {currentChallenge ? currentChallenge.name : "Select a Challenge"}
          </p>
        </div>
        {currentChallenge && (
           <button onClick={() => setCurrentChallenge(null)} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
             Menu
           </button>
        )}
      </div>

      {/* Main Area */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        
        {/* Victory Overlay */}
        {victoryState !== 'none' && (
          <div className="absolute inset-0 z-50 bg-white/90 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="text-6xl mb-4">
              {victoryState === 'success' ? '🎉' : '🧠'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {victoryState === 'success' ? 'Graph Solved!' : 'Correct Observation!'}
            </h2>
            <p className="text-gray-600 mt-2 mb-6">
              {victoryState === 'success' 
                ? "You visited every edge exactly once." 
                : "This graph has no Eulerian path (too many odd nodes)."}
            </p>
            <div className="flex gap-4">
               <button 
                onClick={() => {
                   const idx = challenges.findIndex(c => c.id === currentChallenge?.id);
                   if (idx < challenges.length - 1) loadChallenge(challenges[idx + 1]);
                   else setCurrentChallenge(null);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-blue-700"
              >
                Next Level
              </button>
            </div>
          </div>
        )}

        {!currentChallenge ? (
          // --- Menu ---
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl overflow-y-auto max-h-full pb-10">
            {challenges.map(c => (
              <div 
                key={c.id}
                onClick={() => loadChallenge(c)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:-translate-y-1 ${
                  completedChallenges.has(c.id) ? 'bg-green-50 border-green-400' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">{c.name}</span>
                  {completedChallenges.has(c.id) && <span>✅</span>}
                </div>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 
                    c.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.difficulty}
                  </span>
                  {c.type === 'impossible' && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Tricky</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- Game Board ---
          <div className="w-full max-w-lg aspect-square relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* HUD */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
              <div className="bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm">
                Edges: {path.length > 0 ? path.length - 1 : 0} / {edges.length}
              </div>
              <div className="pointer-events-auto flex gap-2">
                 <button onClick={reset} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-200">
                    Reset
                 </button>
                 <button onClick={handleClaimImpossible} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-purple-200 border border-purple-200">
                    Impossible?
                 </button>
              </div>
            </div>

            <svg 
              ref={svgRef}
              viewBox="0 0 400 400"
              className="w-full h-full touch-none"
              style={{ touchAction: 'none' }}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              {/* 1. Base Edges */}
              {edges.map(e => (
                <line 
                  key={e.id}
                  x1={nodes.find(n=>n.id===e.a)?.x} y1={nodes.find(n=>n.id===e.a)?.y}
                  x2={nodes.find(n=>n.id===e.b)?.x} y2={nodes.find(n=>n.id===e.b)?.y}
                  stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round"
                />
              ))}

              {/* 2. Used Edges */}
              {edges.map(e => {
                const status = getEdgeStatus(e);
                if (status !== 'used') return null;
                const n1 = nodes.find(n=>n.id===e.a);
                const n2 = nodes.find(n=>n.id===e.b);
                return (
                  <line 
                    key={`used-${e.id}`}
                    x1={n1?.x} y1={n1?.y} x2={n2?.x} y2={n2?.y}
                    stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"
                  />
                )
              })}

              {/* 3. Rubber Band (Preview) */}
              {isDrawing && lastNodeObj && cursor && (
                <line 
                  x1={lastNodeObj.x} y1={lastNodeObj.y}
                  x2={activeNodeObj ? activeNodeObj.x : cursor.x} 
                  y2={activeNodeObj ? activeNodeObj.y : cursor.y}
                  stroke="#60a5fa" strokeWidth="4" strokeDasharray="6,6" opacity="0.6"
                  className="pointer-events-none"
                />
              )}

              {/* 4. Nodes */}
              {nodes.map(n => {
                const isActive = activeNode === n.id;
                const isVisited = path.includes(n.id);
                const isCurrent = path[path.length-1] === n.id;
                
                return (
                  <g key={n.id}>
                     {/* Transparent Hitbox */}
                     <circle cx={n.x} cy={n.y} r="30" fill="transparent" />
                     {/* Visual Node */}
                     <circle 
                        cx={n.x} cy={n.y} 
                        r={isActive ? 14 : 9}
                        fill={isCurrent ? "#2563eb" : isVisited ? "#60a5fa" : "#cbd5e1"}
                        stroke="white" strokeWidth="3"
                        className="transition-all duration-200"
                     />
                     {/* Degree hint (optional, good for learning) */}
                     {/* <text x={n.x} y={n.y+25} textAnchor="middle" fontSize="10" fill="#94a3b8">ID:{n.id}</text> */}
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}