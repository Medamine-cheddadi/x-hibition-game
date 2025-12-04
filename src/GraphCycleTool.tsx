import React, { useState, useRef, useEffect, useCallback } from "react";
import { challenges, Challenge, isCycleCorrect } from "./challenges";

// Touch-based Cycle Drawing Game
// - Only displays predefined challenges
// - Draw cycles by touching/dragging along edges on the screen
// - Automatically detects cycles when path closes

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Edge {
  id: string;
  a: number;
  b: number;
}

interface Point {
  x: number;
  y: number;
}

export default function GraphCycleTool() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());
  const [showChallengeSelector, setShowChallengeSelector] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  
  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPath, setDrawPath] = useState<Point[]>([]);
  const [detectedPath, setDetectedPath] = useState<number[]>([]); // Node IDs in order
  const [cycle, setCycle] = useState<number[] | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const moveToNextChallenge = useCallback(() => {
    if (!currentChallenge) return;
    
    const currentIndex = challenges.findIndex(c => c.id === currentChallenge.id);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < challenges.length) {
      loadChallenge(challenges[nextIndex]);
      setShowCongratulations(false);
    } else {
      setShowCongratulations(false);
      setCurrentChallenge(null);
      resetDrawing();
      alert("🎊 Amazing! You've completed all challenges! Well done!");
    }
  }, [currentChallenge]);

  // Check if cycle is correct when it's found
  useEffect(() => {
    if (cycle && currentChallenge && !challengeCompleted && detectedPath.length >= 3) {
      const correct = isCycleCorrect(cycle, currentChallenge.expectedCycles);
      if (correct && !challengeCompleted) {
        setChallengeCompleted(true);
        setCompletedChallenges(prev => new Set([...prev, currentChallenge.id]));
        setShowCongratulations(true);
        
        const timer = setTimeout(() => {
          moveToNextChallenge();
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [cycle, currentChallenge, challengeCompleted, moveToNextChallenge, detectedPath]);

  function getSVGPoint(x: number, y: number): Point {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const loc = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: loc.x, y: loc.y };
  }

  function getClientPoint(e: React.TouchEvent | React.MouseEvent): Point {
    if ('touches' in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if ('clientX' in e) {
      return { x: e.clientX, y: e.clientY };
    }
    return { x: 0, y: 0 };
  }

  function distance(p1: Point, p2: Point): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }

  function findNearestNode(point: Point, threshold: number = 30): Node | null {
    let nearest: Node | null = null;
    let minDist = threshold;
    
    for (const node of nodes) {
      const dist = distance(point, node);
      if (dist < minDist) {
        minDist = dist;
        nearest = node;
      }
    }
    
    return nearest;
  }

  function detectPathFromDrawing(drawingPath: Point[]): number[] {
    if (drawingPath.length === 0) return [];
    
    const nodePath: number[] = [];
    const visitedNodes = new Set<number>();
    let lastNode: Node | null = null;
    
    for (const point of drawingPath) {
      const nearest = findNearestNode(point, 40);
      if (nearest) {
        // Only add if it's a new node or we're coming back to the start
        if (!lastNode || nearest.id !== lastNode.id) {
          // Check if there's an edge from lastNode to nearest
          if (!lastNode || edges.some(e => 
            (e.a === lastNode!.id && e.b === nearest.id) || 
            (e.a === nearest.id && e.b === lastNode!.id)
          )) {
            if (nearest.id === nodePath[0] && nodePath.length >= 2) {
              // Coming back to start - complete the cycle
              nodePath.push(nearest.id);
              break;
            } else if (!visitedNodes.has(nearest.id) || nearest.id === nodePath[0]) {
              if (nodePath.length === 0 || nearest.id !== nodePath[nodePath.length - 1]) {
                nodePath.push(nearest.id);
                visitedNodes.add(nearest.id);
                lastNode = nearest;
              }
            }
          }
        }
      }
    }
    
    // Check if path forms a cycle
    if (nodePath.length >= 3 && nodePath[0] === nodePath[nodePath.length - 1]) {
      return nodePath.slice(0, -1); // Remove duplicate start node
    }
    
    return nodePath;
  }

  function handleStart(e: React.TouchEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) {
    if (!currentChallenge) return;
    e.preventDefault();
    setIsDrawing(true);
    const clientPt = getClientPoint(e);
    const svgPt = getSVGPoint(clientPt.x, clientPt.y);
    setDrawPath([svgPt]);
    setDetectedPath([]);
    setCycle(null);
    setChallengeCompleted(false);
  }

  function handleMove(e: React.TouchEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) {
    if (!isDrawing || !currentChallenge) return;
    e.preventDefault();
    const clientPt = getClientPoint(e);
    const svgPt = getSVGPoint(clientPt.x, clientPt.y);
    
    setDrawPath(prev => {
      const newPath = [...prev, svgPt];
      const detected = detectPathFromDrawing(newPath);
      setDetectedPath(detected);
      
      // Check if it's a cycle
      if (detected.length >= 3 && detected[0] === detected[detected.length - 1]) {
        setCycle(detected.slice(0, -1));
      } else if (detected.length >= 3) {
        // Check if we're back at the start
        const firstNode = nodes.find(n => n.id === detected[0]);
        const lastPoint = svgPt;
        if (firstNode && distance(lastPoint, firstNode) < 40) {
          setCycle(detected);
        }
      }
      
      return newPath;
    });
  }

  function handleEnd(e: React.TouchEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    
    // Final check for cycle
    const finalDetected = detectPathFromDrawing(drawPath);
    if (finalDetected.length >= 3) {
      const firstNode = nodes.find(n => n.id === finalDetected[0]);
      const lastPoint = drawPath[drawPath.length - 1];
      if (firstNode && distance(lastPoint, firstNode) < 50) {
        setCycle(finalDetected);
      } else if (finalDetected[0] === finalDetected[finalDetected.length - 1]) {
        setCycle(finalDetected.slice(0, -1));
      }
    }
    
    // Clear drawing after a short delay to show the result
    setTimeout(() => {
      setDrawPath([]);
    }, 1000);
  }

  function resetDrawing() {
    setDrawPath([]);
    setDetectedPath([]);
    setCycle(null);
    setChallengeCompleted(false);
    setIsDrawing(false);
  }

  function loadChallenge(challenge: Challenge) {
    setNodes([...challenge.nodes]);
    setEdges([...challenge.edges]);
    resetDrawing();
    setCurrentChallenge(challenge);
    setShowChallengeSelector(false);
  }

  const nodeById = (id: number) => nodes.find(n => n.id === id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentIndex = currentChallenge ? challenges.findIndex(c => c.id === currentChallenge.id) : -1;
  const hasNextChallenge = currentIndex >= 0 && currentIndex < challenges.length - 1;

  // Get path string for SVG
  const getPathString = () => {
    if (drawPath.length === 0) return '';
    return drawPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Congratulations Modal */}
      {showCongratulations && currentChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 text-center animate-bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
            <p className="text-xl text-gray-700 mb-4">
              You found the correct cycle in <strong>"{currentChallenge.name}"</strong>!
            </p>
            <div className="flex gap-3 justify-center mt-6">
              {hasNextChallenge ? (
                <>
                  <button
                    onClick={moveToNextChallenge}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                  >
                    Next Challenge →
                  </button>
                  <button
                    onClick={() => {
                      setShowCongratulations(false);
                    }}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                  >
                    Stay Here
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowCongratulations(false);
                    setCurrentChallenge(null);
                    resetDrawing();
                    setShowChallengeSelector(true);
                  }}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition-colors"
                >
                  🏆 All Challenges Complete!
                </button>
              )}
            </div>
            {hasNextChallenge && (
              <p className="text-sm text-gray-500 mt-4">
                Moving to next challenge in 3 seconds...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Header with Logo */}
      <div className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-6">
            <img src="/logo.svg" alt="Club Logo" className="h-20 w-20 md:h-28 md:w-28" />
            <div className="text-center">
              <h1 className="text-base md:text-lg font-semibold text-gray-700">Graph Cycle Challenge</h1>
              <p className="text-xs text-gray-500 mt-1">Draw cycles by touching the screen</p>
            </div>
          </div>
          {currentChallenge && (
            <div className="text-center mt-2 text-sm text-gray-600">
              Challenge {currentIndex + 1} of {challenges.length}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Challenge Selector */}
        {showChallengeSelector && (
          <div className="mb-4 bg-white rounded-lg shadow p-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select a Challenge</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {challenges.map(challenge => (
                <div
                  key={challenge.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    completedChallenges.has(challenge.id)
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white hover:shadow-md'
                  }`}
                  onClick={() => loadChallenge(challenge)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{challenge.name}</h3>
                    {completedChallenges.has(challenge.id) && (
                      <span className="text-green-600">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {currentChallenge && (
          <div className="h-full flex flex-col bg-white rounded-lg shadow p-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-3 flex-shrink-0">
              <h2 className="text-lg md:text-xl font-semibold">
                Challenge: {currentChallenge.name}
              </h2>
              <button
                className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => {
                  setCurrentChallenge(null);
                  resetDrawing();
                  setShowChallengeSelector(true);
                }}
              >
                Back to Challenges
              </button>
            </div>

            <div className={`mb-3 p-2 rounded flex-shrink-0 ${challengeCompleted ? 'bg-green-100 border-2 border-green-500' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm text-gray-800">{currentChallenge.description}</p>
                {challengeCompleted && (
                  <span className="text-green-700 font-semibold text-sm">✓ Completed!</span>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                👆 Touch and drag along the edges to draw your cycle path
              </p>
            </div>

            <div className="border rounded relative flex-1 min-h-0" style={{ touchAction: 'none' }}>
              <svg 
                ref={svgRef} 
                width="100%" 
                height="100%" 
                style={{ background: '#fafafa' }}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
              >
                {/* Edges */}
                {edges.map(ed => {
                  const a = nodeById(ed.a);
                  const b = nodeById(ed.b);
                  if (!a || !b) return null;
                  const inCycle = cycle && (() => {
                    for (let i = 0; i < cycle.length; i++) {
                      const n1 = cycle[i];
                      const n2 = cycle[(i + 1) % cycle.length];
                      if ((n1 === a.id && n2 === b.id) || (n1 === b.id && n2 === a.id)) return true;
                    }
                    return false;
                  })();
                  const isCorrect = currentChallenge && cycle && challengeCompleted;
                  return (
                    <g key={ed.id}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={isCorrect ? "#10b981" : inCycle ? "#ff6b6b" : "#999"}
                        strokeWidth={inCycle || isCorrect ? 4 : 2}
                      />
                    </g>
                  );
                })}

                {/* Drawn path */}
                {drawPath.length > 1 && (
                  <path
                    ref={pathRef}
                    d={getPathString()}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.6"
                  />
                )}

                {/* Nodes */}
                {nodes.map(n => {
                  const inPath = detectedPath.includes(n.id);
                  const isCycleNode = cycle && cycle.includes(n.id);
                  const isCorrect = currentChallenge && cycle && challengeCompleted && isCycleNode;
                  const isStart = detectedPath.length > 0 && detectedPath[0] === n.id;
                  return (
                    <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                      <circle
                        r={20}
                        fill={isCorrect ? "#10b981" : isCycleNode ? "#ffe66d" : inPath ? "#cfe3ff" : "#fff"}
                        stroke={isCorrect ? "#059669" : isStart ? "#3b82f6" : "#333"}
                        strokeWidth={isCorrect || isStart ? 3 : 2}
                      />
                      <text x={0} y={6} textAnchor="middle" style={{ fontSize: 12, fontWeight: 600 }}>
                        {n.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-2 text-xs text-gray-700 flex-shrink-0">
              <div>
                Detected path: {detectedPath.length > 0 ? detectedPath.join(' → ') : 'Draw a path...'}
                {cycle && ` (Cycle: ${cycle.join(' → ')})`}
              </div>
              {currentChallenge && cycle && !challengeCompleted && (
                <div className="mt-1 text-orange-600 font-medium">
                  ⚠ Cycle found, but it's not the expected one. Keep trying!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
