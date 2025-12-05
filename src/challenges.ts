// Predefined graph challenges for Eulerian paths and cycles
// Players must find an Eulerian path (visits every edge exactly once, can start/end at different nodes)
// OR an Eulerian cycle (visits every edge exactly once, starts and ends at same node)

export interface Challenge {
  id: number;
  name: string;
  nodes: Array<{ id: number; x: number; y: number }>;
  edges: Array<{ id: string; a: number; b: number }>;
  expectedPaths: number[][]; // Reference examples
  difficulty: 'easy' | 'medium' | 'hard' | 'super hard' | 'infinitely hard';
  type: 'path' | 'cycle' | 'impossible'; // path = Eulerian path, cycle = must be cycle, impossible = no solution
}

export const challenges: Challenge[] = [
  {
    id: 1,
    name: "Triangle",
    difficulty: 'easy',
    type: 'path',
    // Beautiful equilateral triangle - has Eulerian path
    nodes: [
      { id: 1, x: 200, y: 80 },
      { id: 2, x: 120, y: 200 },
      { id: 3, x: 280, y: 200 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 1 }
    ],
    expectedPaths: [
      [1, 2, 3, 1]
    ]
  },
  {
    id: 2,
    name: "Square",
    difficulty: 'easy',
    type: 'path',
    // Perfect square, centered - has Eulerian path
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 250, y: 200 },
      { id: 4, x: 150, y: 200 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 1 }
    ],
    expectedPaths: [
      [1, 2, 3, 4, 1]
    ]
  },
  {
    id: 3,
    name: "Pentagon",
    difficulty: 'medium',
    type: 'path',
    // Regular pentagon, beautifully symmetric - has Eulerian path
    nodes: [
      { id: 1, x: 200, y: 60 },
      { id: 2, x: 280, y: 110 },
      { id: 3, x: 260, y: 210 },
      { id: 4, x: 140, y: 210 },
      { id: 5, x: 120, y: 110 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 1 }
    ],
    expectedPaths: [
      [1, 2, 3, 4, 5, 1]
    ]
  },
  {
    id: 4,
    name: "Hexagon",
    difficulty: 'medium',
    type: 'path',
    // Regular hexagon, perfectly symmetric - has Eulerian path
    nodes: [
      { id: 1, x: 200, y: 70 },
      { id: 2, x: 270, y: 110 },
      { id: 3, x: 270, y: 190 },
      { id: 4, x: 200, y: 230 },
      { id: 5, x: 130, y: 190 },
      { id: 6, x: 130, y: 110 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 1 }
    ],
    expectedPaths: [
      [1, 2, 3, 4, 5, 6, 1]
    ]
  },
  {
    id: 5,
    name: "Double Square",
    difficulty: 'medium',
    type: 'path',
    // Two connected squares, symmetric layout - has Eulerian path
    nodes: [
      { id: 1, x: 130, y: 100 },
      { id: 2, x: 200, y: 100 },
      { id: 3, x: 200, y: 180 },
      { id: 4, x: 130, y: 180 },
      { id: 5, x: 270, y: 100 },
      { id: 6, x: 270, y: 180 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 1 },
      { id: 'e5', a: 2, b: 5 },
      { id: 'e6', a: 5, b: 6 },
      { id: 'e7', a: 6, b: 3 },
      { id: 'e8', a: 2, b: 6 },
      { id: 'e9', a: 3, b: 6 }
    ],
    expectedPaths: [
      [1, 2, 5, 6, 3, 4, 1, 2, 6, 3, 6, 2]
    ]
  },
  {
    id: 6,
    name: "Bow Tie",
    difficulty: 'hard',
    type: 'path',
    // Beautiful symmetric bow tie shape - has Eulerian path
    nodes: [
      { id: 1, x: 150, y: 90 },
      { id: 2, x: 250, y: 90 },
      { id: 3, x: 200, y: 180 },
      { id: 4, x: 150, y: 270 },
      { id: 5, x: 250, y: 270 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 1 },
      { id: 'e4', a: 3, b: 4 },
      { id: 'e5', a: 4, b: 5 },
      { id: 'e6', a: 5, b: 3 },
      { id: 'e7', a: 1, b: 3 },
      { id: 'e8', a: 1, b: 4 },
      { id: 'e9', a: 2, b: 5 },
      { id: 'e10', a: 2, b: 3 },
      { id: 'e11', a: 4, b: 5 }
    ],
    expectedPaths: [
      [1, 2, 3, 4, 5, 3, 1, 4, 1, 3, 2, 5, 2, 3, 2, 1, 4, 5, 4]
    ]
  },
  {
    id: 7,
    name: "Octagon",
    difficulty: 'hard',
    type: 'path',
    // Regular octagon, perfectly symmetric - has Eulerian path
    nodes: [
      { id: 1, x: 200, y: 60 },
      { id: 2, x: 270, y: 90 },
      { id: 3, x: 310, y: 150 },
      { id: 4, x: 270, y: 210 },
      { id: 5, x: 200, y: 240 },
      { id: 6, x: 130, y: 210 },
      { id: 7, x: 90, y: 150 },
      { id: 8, x: 130, y: 90 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 7 },
      { id: 'e7', a: 7, b: 8 },
      { id: 'e8', a: 8, b: 1 }
    ],
    expectedPaths: [
      [1, 2, 3, 4, 5, 6, 7, 8, 1]
    ]
  },
  {
    id: 8,
    name: "Tetrahedron",
    difficulty: 'hard',
    type: 'path',
    // Beautiful tetrahedron shape, symmetric - has Eulerian path
    nodes: [
      { id: 1, x: 200, y: 70 },
      { id: 2, x: 140, y: 210 },
      { id: 3, x: 260, y: 210 },
      { id: 4, x: 200, y: 140 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 1, b: 3 },
      { id: 'e3', a: 1, b: 4 },
      { id: 'e4', a: 2, b: 3 },
      { id: 'e5', a: 2, b: 4 },
      { id: 'e6', a: 3, b: 4 },
      { id: 'e7', a: 1, b: 2 },
      { id: 'e8', a: 3, b: 4 }
    ],
    expectedPaths: [
      [1, 2, 3, 1, 4, 2, 4, 3, 4, 1, 2, 1]
    ]
  },
  {
    id: 9,
    name: "Two Triangles",
    difficulty: 'hard',
    type: 'path',
    // Beautiful symmetric design with two connected triangles - has Eulerian path
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 200, y: 180 },
      { id: 4, x: 150, y: 260 },
      { id: 5, x: 250, y: 260 },
      { id: 6, x: 200, y: 200 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 1 },
      { id: 'e4', a: 3, b: 6 },
      { id: 'e5', a: 6, b: 4 },
      { id: 'e6', a: 4, b: 5 },
      { id: 'e7', a: 5, b: 6 },
      { id: 'e8', a: 3, b: 5 },
      { id: 'e9', a: 1, b: 6 },
      { id: 'e10', a: 2, b: 4 },
      { id: 'e11', a: 1, b: 4 },
      { id: 'e12', a: 2, b: 5 }
    ],
    expectedPaths: [
      [1, 2, 3, 5, 6, 4, 5, 3, 6, 1, 4, 1, 3, 1, 2, 4, 2, 5, 2]
    ]
  },
  {
    id: 10,
    name: "Complex Network",
    difficulty: 'hard',
    type: 'path',
    // Beautiful star-like network with center hub - has Eulerian path
    nodes: [
      { id: 1, x: 110, y: 100 },
      { id: 2, x: 200, y: 70 },
      { id: 3, x: 290, y: 100 },
      { id: 4, x: 290, y: 200 },
      { id: 5, x: 200, y: 230 },
      { id: 6, x: 110, y: 200 },
      { id: 7, x: 200, y: 150 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 1 },
      { id: 'e7', a: 1, b: 7 },
      { id: 'e8', a: 2, b: 7 },
      { id: 'e9', a: 3, b: 7 },
      { id: 'e10', a: 4, b: 7 },
      { id: 'e11', a: 5, b: 7 },
      { id: 'e12', a: 6, b: 7 },
      { id: 'e13', a: 1, b: 4 },
      { id: 'e14', a: 2, b: 5 },
      { id: 'e15', a: 3, b: 6 }
    ],
    expectedPaths: [
      [1, 2, 7, 6, 5, 4, 3, 7, 2, 3, 4, 7, 5, 2, 1, 7, 4, 1, 6, 7, 3, 6, 3, 2, 1]
    ]
  },
  {
    id: 11,
    name: "Perfect Cycle",
    difficulty: 'super hard',
    type: 'cycle',
    // This graph requires an Eulerian CYCLE (must start and end at same node)
    // All nodes have even degree, so cycle exists
    nodes: [
      { id: 1, x: 200, y: 80 },
      { id: 2, x: 280, y: 140 },
      { id: 3, x: 240, y: 240 },
      { id: 4, x: 160, y: 240 },
      { id: 5, x: 120, y: 140 },
      { id: 6, x: 200, y: 160 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 1 },
      { id: 'e6', a: 1, b: 6 },
      { id: 'e7', a: 2, b: 6 },
      { id: 'e8', a: 3, b: 6 },
      { id: 'e9', a: 4, b: 6 },
      { id: 'e10', a: 5, b: 6 }
    ],
    expectedPaths: [
      [1, 2, 6, 3, 4, 6, 5, 1, 6, 4, 3, 2, 1, 5, 6, 1]
    ]
  },
  {
    id: 12,
    name: "The Impossible",
    difficulty: 'infinitely hard',
    type: 'impossible',
    // This graph has NO Eulerian path or cycle (more than 2 nodes with odd degree)
    // Nodes 1, 3, 5, 7 have odd degrees - impossible!
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 300, y: 200 },
      { id: 4, x: 250, y: 300 },
      { id: 5, x: 150, y: 300 },
      { id: 6, x: 100, y: 200 },
      { id: 7, x: 200, y: 200 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 1 },
      { id: 'e7', a: 1, b: 7 },
      { id: 'e8', a: 3, b: 7 },
      { id: 'e9', a: 5, b: 7 }
    ],
    expectedPaths: [] // No solution exists!
  }
];

// Helper function to get edge key (normalized, undirected)
function getEdgeKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// Check if a path is an Eulerian path (visits every edge exactly once, can start/end at different nodes)
export function isEulerianPath(foundPath: number[], edges: Array<{ id: string; a: number; b: number }>): boolean {
  if (foundPath.length === 0 || edges.length === 0) return false;
  
  // Path should have length = number of edges + 1
  if (foundPath.length !== edges.length + 1) return false;
  
  // Count edge usage
  const edgeCount = new Map<string, number>();
  edges.forEach(edge => {
    const key = getEdgeKey(edge.a, edge.b);
    edgeCount.set(key, 0);
  });
  
  // Count edges used in the path
  for (let i = 0; i < foundPath.length - 1; i++) {
    const a = foundPath[i];
    const b = foundPath[i + 1];
    const key = getEdgeKey(a, b);
    const count = edgeCount.get(key) || 0;
    edgeCount.set(key, count + 1);
  }
  
  // Check that every edge is used exactly once
  for (const count of edgeCount.values()) {
    if (count !== 1) return false;
  }
  
  return true;
}

// Check if a path is an Eulerian cycle (visits every edge exactly once, starts and ends at same node)
export function isEulerianCycle(foundCycle: number[], edges: Array<{ id: string; a: number; b: number }>): boolean {
  if (foundCycle.length === 0 || edges.length === 0) return false;
  
  // Must be a cycle (start and end at same node)
  if (foundCycle[0] !== foundCycle[foundCycle.length - 1]) return false;
  
  // Use the path validator (cycle is just a special case of path)
  return isEulerianPath(foundCycle, edges);
}
