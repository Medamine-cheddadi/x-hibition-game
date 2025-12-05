// Predefined graph challenges for Eulerian cycles
// Each challenge must be an Eulerian graph (all nodes have even degree)
// Players must find an Eulerian cycle that visits every edge exactly once

export interface Challenge {
  id: number;
  name: string;
  nodes: Array<{ id: number; x: number; y: number }>;
  edges: Array<{ id: string; a: number; b: number }>;
  expectedCycles: number[][]; // Reference examples (validation uses Eulerian cycle check)
  difficulty: 'easy' | 'medium' | 'hard';
}

export const challenges: Challenge[] = [
  {
    id: 1,
    name: "Triangle",
    difficulty: 'easy',
    // Beautiful equilateral triangle
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
    expectedCycles: [
      [1, 2, 3, 1]
    ]
  },
  {
    id: 2,
    name: "Square",
    difficulty: 'easy',
    // Perfect square, centered
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
    expectedCycles: [
      [1, 2, 3, 4, 1]
    ]
  },
  {
    id: 3,
    name: "Pentagon",
    difficulty: 'medium',
    // Regular pentagon, beautifully symmetric
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
    expectedCycles: [
      [1, 2, 3, 4, 5, 1]
    ]
  },
  {
    id: 4,
    name: "Hexagon",
    difficulty: 'medium',
    // Regular hexagon, perfectly symmetric
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
    expectedCycles: [
      [1, 2, 3, 4, 5, 6, 1]
    ]
  },
  {
    id: 5,
    name: "Double Square",
    difficulty: 'medium',
    // Two connected squares, symmetric layout
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
      { id: 'e9', a: 3, b: 6 } // Added to fix odd degrees
    ],
    expectedCycles: [
      [1, 2, 5, 6, 3, 4, 1, 2, 6, 3, 6, 2]
    ]
  },
  {
    id: 6,
    name: "Bow Tie",
    difficulty: 'hard',
    // Beautiful symmetric bow tie shape
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
      { id: 'e11', a: 4, b: 5 } // Added to fix odd degrees for nodes 4 and 5
    ],
    expectedCycles: [
      [1, 2, 3, 4, 5, 3, 1, 4, 1, 3, 2, 5, 2, 3, 2, 1, 4, 5, 4]
    ]
  },
  {
    id: 7,
    name: "Octagon",
    difficulty: 'hard',
    // Regular octagon, perfectly symmetric
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
    expectedCycles: [
      [1, 2, 3, 4, 5, 6, 7, 8, 1]
    ]
  },
  {
    id: 8,
    name: "Tetrahedron",
    difficulty: 'hard',
    // Beautiful tetrahedron shape, symmetric
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
      { id: 'e7', a: 1, b: 2 }, // Duplicate to make even degrees
      { id: 'e8', a: 3, b: 4 }  // Duplicate to make even degrees
    ],
    expectedCycles: [
      [1, 2, 3, 1, 4, 2, 4, 3, 4, 1, 2, 1]
    ]
  },
  {
    id: 9,
    name: "Two Triangles",
    difficulty: 'hard',
    // Fixed: Beautiful symmetric design with two connected triangles
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
      { id: 'e12', a: 2, b: 5 } // Added to make all degrees even
    ],
    expectedCycles: [
      [1, 2, 3, 5, 6, 4, 5, 3, 6, 1, 4, 1, 3, 1, 2, 4, 2, 5, 2]
    ]
  },
  {
    id: 10,
    name: "Complex Network",
    difficulty: 'hard',
    // Beautiful star-like network with center hub
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
      { id: 'e15', a: 3, b: 6 } // Added to fix odd degrees
    ],
    expectedCycles: [
      [1, 2, 7, 6, 5, 4, 3, 7, 2, 3, 4, 7, 5, 2, 1, 7, 4, 1, 6, 7, 3, 6, 3, 2, 1]
    ]
  }
];

// Helper function to get edge key (normalized, undirected)
function getEdgeKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// Check if a path is an Eulerian cycle (visits every edge exactly once)
export function isEulerianCycle(foundCycle: number[], edges: Array<{ id: string; a: number; b: number }>): boolean {
  if (foundCycle.length === 0 || edges.length === 0) return false;
  
  // Must be a cycle (start and end at same node)
  if (foundCycle[0] !== foundCycle[foundCycle.length - 1]) return false;
  
  // Path should have length = number of edges + 1 (since it's a cycle)
  if (foundCycle.length !== edges.length + 1) return false;
  
  // Count edge usage
  const edgeCount = new Map<string, number>();
  edges.forEach(edge => {
    const key = getEdgeKey(edge.a, edge.b);
    edgeCount.set(key, 0);
  });
  
  // Count edges used in the path
  for (let i = 0; i < foundCycle.length - 1; i++) {
    const a = foundCycle[i];
    const b = foundCycle[i + 1];
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
