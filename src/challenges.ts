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
    nodes: [
      { id: 1, x: 200, y: 100 },
      { id: 2, x: 100, y: 200 },
      { id: 3, x: 300, y: 200 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 1 }
    ],
    expectedCycles: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ]
  },
  {
    id: 2,
    name: "Square",
    difficulty: 'easy',
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
      [1, 2, 3, 4],
      [1, 4, 3, 2],
      [2, 3, 4, 1],
      [2, 1, 4, 3],
      [3, 4, 1, 2],
      [3, 2, 1, 4],
      [4, 1, 2, 3],
      [4, 3, 2, 1]
    ]
  },
  {
    id: 3,
    name: "Pentagon",
    difficulty: 'medium',
    nodes: [
      { id: 1, x: 200, y: 50 },
      { id: 2, x: 300, y: 100 },
      { id: 3, x: 280, y: 200 },
      { id: 4, x: 120, y: 200 },
      { id: 5, x: 100, y: 100 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 1 }
    ],
    expectedCycles: [
      [1, 2, 3, 4, 5],
      [1, 5, 4, 3, 2],
      [2, 3, 4, 5, 1],
      [2, 1, 5, 4, 3],
      [3, 4, 5, 1, 2],
      [3, 2, 1, 5, 4],
      [4, 5, 1, 2, 3],
      [4, 3, 2, 1, 5],
      [5, 1, 2, 3, 4],
      [5, 4, 3, 2, 1]
    ]
  },
  {
    id: 4,
    name: "Hexagon with Diagonals",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 300, y: 180 },
      { id: 4, x: 250, y: 260 },
      { id: 5, x: 150, y: 260 },
      { id: 6, x: 100, y: 180 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 1 },
      { id: 'e7', a: 1, b: 4 },
      { id: 'e8', a: 2, b: 5 }
    ],
    expectedCycles: [
      // Outer cycle (longest)
      [1, 2, 3, 4, 5, 6],
      [1, 6, 5, 4, 3, 2],
      [2, 3, 4, 5, 6, 1],
      [2, 1, 6, 5, 4, 3],
      [3, 4, 5, 6, 1, 2],
      [3, 2, 1, 6, 5, 4],
      [4, 5, 6, 1, 2, 3],
      [4, 3, 2, 1, 6, 5],
      [5, 6, 1, 2, 3, 4],
      [5, 4, 3, 2, 1, 6],
      [6, 1, 2, 3, 4, 5],
      [6, 5, 4, 3, 2, 1]
    ]
  },
  {
    id: 5,
    name: "Star Graph",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 200, y: 80 },   // Top
      { id: 2, x: 320, y: 140 },  // Right
      { id: 3, x: 280, y: 260 },  // Bottom-right
      { id: 4, x: 120, y: 260 },  // Bottom-left
      { id: 5, x: 80, y: 140 },   // Left
      { id: 6, x: 200, y: 170 }   // Center
    ],
    edges: [
      { id: 'e1', a: 1, b: 6 },
      { id: 'e2', a: 2, b: 6 },
      { id: 'e3', a: 3, b: 6 },
      { id: 'e4', a: 4, b: 6 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 1, b: 2 },
      { id: 'e7', a: 2, b: 3 },
      { id: 'e8', a: 3, b: 4 },
      { id: 'e9', a: 4, b: 5 },
      { id: 'e10', a: 5, b: 1 }
    ],
    expectedCycles: [
      // Outer cycle (all outer nodes)
      [1, 2, 3, 4, 5],
      [1, 5, 4, 3, 2],
      [2, 3, 4, 5, 1],
      [2, 1, 5, 4, 3],
      [3, 4, 5, 1, 2],
      [3, 2, 1, 5, 4],
      [4, 5, 1, 2, 3],
      [4, 3, 2, 1, 5],
      [5, 1, 2, 3, 4],
      [5, 4, 3, 2, 1]
    ]
  },
  {
    id: 6,
    name: "Double Bridge",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 100, y: 100 },
      { id: 2, x: 200, y: 100 },
      { id: 3, x: 300, y: 100 },
      { id: 4, x: 100, y: 200 },
      { id: 5, x: 200, y: 200 },
      { id: 6, x: 300, y: 200 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 4, b: 5 },
      { id: 'e4', a: 5, b: 6 },
      { id: 'e5', a: 1, b: 4 },
      { id: 'e6', a: 3, b: 6 },
      { id: 'e7', a: 2, b: 5 },
      { id: 'e8', a: 1, b: 5 },
      { id: 'e9', a: 3, b: 5 }
    ],
    expectedCycles: [
      // Using both bridges
      [1, 2, 5, 4],
      [1, 4, 5, 2],
      [2, 3, 6, 5],
      [2, 5, 6, 3],
      [3, 6, 5, 2],
      [3, 2, 5, 6],
      [4, 5, 2, 1],
      [4, 1, 2, 5],
      // Longer cycles
      [1, 2, 3, 6, 5, 4],
      [1, 4, 5, 6, 3, 2],
      [2, 1, 4, 5, 6, 3],
      [2, 3, 6, 5, 4, 1]
    ]
  },
  {
    id: 7,
    name: "Octagon Challenge",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 200, y: 50 },
      { id: 2, x: 300, y: 80 },
      { id: 3, x: 350, y: 150 },
      { id: 4, x: 300, y: 220 },
      { id: 5, x: 200, y: 250 },
      { id: 6, x: 100, y: 220 },
      { id: 7, x: 50, y: 150 },
      { id: 8, x: 100, y: 80 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 7 },
      { id: 'e7', a: 7, b: 8 },
      { id: 'e8', a: 8, b: 1 },
      { id: 'e9', a: 1, b: 4 },
      { id: 'e10', a: 2, b: 5 },
      { id: 'e11', a: 3, b: 6 },
      { id: 'e12', a: 4, b: 7 }
    ],
    expectedCycles: [
      // Outer cycle (all 8 nodes)
      [1, 2, 3, 4, 5, 6, 7, 8],
      [1, 8, 7, 6, 5, 4, 3, 2],
      [2, 3, 4, 5, 6, 7, 8, 1],
      [2, 1, 8, 7, 6, 5, 4, 3],
      [3, 4, 5, 6, 7, 8, 1, 2],
      [3, 2, 1, 8, 7, 6, 5, 4],
      [4, 5, 6, 7, 8, 1, 2, 3],
      [4, 3, 2, 1, 8, 7, 6, 5],
      [5, 6, 7, 8, 1, 2, 3, 4],
      [5, 4, 3, 2, 1, 8, 7, 6],
      [6, 7, 8, 1, 2, 3, 4, 5],
      [6, 5, 4, 3, 2, 1, 8, 7],
      [7, 8, 1, 2, 3, 4, 5, 6],
      [7, 6, 5, 4, 3, 2, 1, 8],
      [8, 1, 2, 3, 4, 5, 6, 7],
      [8, 7, 6, 5, 4, 3, 2, 1]
    ]
  },
  {
    id: 8,
    name: "Complex Web",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 300, y: 180 },
      { id: 4, x: 250, y: 260 },
      { id: 5, x: 150, y: 260 },
      { id: 6, x: 100, y: 180 },
      { id: 7, x: 200, y: 180 }
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
      { id: 'e14', a: 2, b: 5 }
    ],
    expectedCycles: [
      // Outer cycle
      [1, 2, 3, 4, 5, 6],
      [1, 6, 5, 4, 3, 2],
      // Through center
      [1, 7, 2, 3, 4, 5, 6],
      [1, 6, 5, 4, 3, 2, 7],
      [2, 7, 3, 4, 5, 6, 1],
      [2, 1, 6, 5, 4, 3, 7],
      // Triangles
      [1, 2, 7],
      [1, 7, 2],
      [2, 3, 7],
      [2, 7, 3],
      [3, 4, 7],
      [3, 7, 4],
      [4, 5, 7],
      [4, 7, 5],
      [5, 6, 7],
      [5, 7, 6],
      [6, 1, 7],
      [6, 7, 1],
      // Quadrilaterals
      [1, 2, 5, 4],
      [1, 4, 5, 2],
      [2, 3, 4, 5],
      [2, 5, 4, 3],
      [1, 4, 5, 6],
      [1, 6, 5, 4]
    ]
  },
  {
    id: 9,
    name: "Wheel Graph",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 200, y: 60 },
      { id: 2, x: 280, y: 100 },
      { id: 3, x: 300, y: 180 },
      { id: 4, x: 280, y: 260 },
      { id: 5, x: 200, y: 300 },
      { id: 6, x: 120, y: 260 },
      { id: 7, x: 100, y: 180 },
      { id: 8, x: 120, y: 100 },
      { id: 9, x: 200, y: 180 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 7 },
      { id: 'e7', a: 7, b: 8 },
      { id: 'e8', a: 8, b: 1 },
      { id: 'e9', a: 1, b: 9 },
      { id: 'e10', a: 2, b: 9 },
      { id: 'e11', a: 3, b: 9 },
      { id: 'e12', a: 4, b: 9 },
      { id: 'e13', a: 5, b: 9 },
      { id: 'e14', a: 6, b: 9 },
      { id: 'e15', a: 7, b: 9 },
      { id: 'e16', a: 8, b: 9 }
    ],
    expectedCycles: [
      // Rim cycle (all outer nodes)
      [1, 2, 3, 4, 5, 6, 7, 8],
      [1, 8, 7, 6, 5, 4, 3, 2],
      [2, 3, 4, 5, 6, 7, 8, 1],
      [2, 1, 8, 7, 6, 5, 4, 3],
      [3, 4, 5, 6, 7, 8, 1, 2],
      [3, 2, 1, 8, 7, 6, 5, 4],
      [4, 5, 6, 7, 8, 1, 2, 3],
      [4, 3, 2, 1, 8, 7, 6, 5],
      [5, 6, 7, 8, 1, 2, 3, 4],
      [5, 4, 3, 2, 1, 8, 7, 6],
      [6, 7, 8, 1, 2, 3, 4, 5],
      [6, 5, 4, 3, 2, 1, 8, 7],
      [7, 8, 1, 2, 3, 4, 5, 6],
      [7, 6, 5, 4, 3, 2, 1, 8],
      [8, 1, 2, 3, 4, 5, 6, 7],
      [8, 7, 6, 5, 4, 3, 2, 1]
    ]
  },
  {
    id: 10,
    name: "Master Challenge",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 100, y: 80 },
      { id: 2, x: 200, y: 60 },
      { id: 3, x: 300, y: 80 },
      { id: 4, x: 350, y: 150 },
      { id: 5, x: 300, y: 220 },
      { id: 6, x: 200, y: 240 },
      { id: 7, x: 100, y: 220 },
      { id: 8, x: 50, y: 150 },
      { id: 9, x: 200, y: 150 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 5 },
      { id: 'e5', a: 5, b: 6 },
      { id: 'e6', a: 6, b: 7 },
      { id: 'e7', a: 7, b: 8 },
      { id: 'e8', a: 8, b: 1 },
      { id: 'e9', a: 1, b: 9 },
      { id: 'e10', a: 2, b: 9 },
      { id: 'e11', a: 3, b: 9 },
      { id: 'e12', a: 4, b: 9 },
      { id: 'e13', a: 5, b: 9 },
      { id: 'e14', a: 6, b: 9 },
      { id: 'e15', a: 7, b: 9 },
      { id: 'e16', a: 8, b: 9 },
      { id: 'e17', a: 2, b: 6 },
      { id: 'e18', a: 4, b: 8 }
    ],
    expectedCycles: [
      // Longest cycle (all outer nodes)
      [1, 2, 3, 4, 5, 6, 7, 8],
      [1, 8, 7, 6, 5, 4, 3, 2],
      [2, 3, 4, 5, 6, 7, 8, 1],
      [2, 1, 8, 7, 6, 5, 4, 3],
      [3, 4, 5, 6, 7, 8, 1, 2],
      [3, 2, 1, 8, 7, 6, 5, 4],
      [4, 5, 6, 7, 8, 1, 2, 3],
      [4, 3, 2, 1, 8, 7, 6, 5],
      [5, 6, 7, 8, 1, 2, 3, 4],
      [5, 4, 3, 2, 1, 8, 7, 6],
      [6, 7, 8, 1, 2, 3, 4, 5],
      [6, 5, 4, 3, 2, 1, 8, 7],
      [7, 8, 1, 2, 3, 4, 5, 6],
      [7, 6, 5, 4, 3, 2, 1, 8],
      [8, 1, 2, 3, 4, 5, 6, 7],
      [8, 7, 6, 5, 4, 3, 2, 1],
      // Through center variations
      [1, 2, 9, 8, 7, 6, 5, 4, 3],
      [1, 3, 4, 5, 6, 7, 8, 9, 2],
      [2, 6, 5, 4, 3, 9, 1, 8, 7]
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


