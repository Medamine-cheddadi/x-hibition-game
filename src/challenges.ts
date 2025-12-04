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
      [1, 2, 3, 1]
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
      [1, 2, 3, 4, 1]
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
      [1, 2, 3, 4, 5, 1]
    ]
  },
  {
    id: 4,
    name: "Hexagon",
    difficulty: 'medium',
    nodes: [
      { id: 1, x: 200, y: 80 },
      { id: 2, x: 280, y: 120 },
      { id: 3, x: 280, y: 200 },
      { id: 4, x: 200, y: 240 },
      { id: 5, x: 120, y: 200 },
      { id: 6, x: 120, y: 120 }
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
    nodes: [
      { id: 1, x: 120, y: 100 },
      { id: 2, x: 200, y: 100 },
      { id: 3, x: 200, y: 180 },
      { id: 4, x: 120, y: 180 },
      { id: 5, x: 280, y: 100 },
      { id: 6, x: 280, y: 180 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 4 },
      { id: 'e4', a: 4, b: 1 },
      { id: 'e5', a: 2, b: 5 },
      { id: 'e6', a: 5, b: 6 },
      { id: 'e7', a: 6, b: 3 },
      { id: 'e8', a: 2, b: 6 }
    ],
    expectedCycles: [
      [1, 2, 5, 6, 3, 4, 1, 2, 6, 3, 2]
    ]
  },
  {
    id: 6,
    name: "Bow Tie",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 200, y: 180 },
      { id: 4, x: 150, y: 260 },
      { id: 5, x: 250, y: 260 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 2, b: 3 },
      { id: 'e3', a: 3, b: 1 },
      { id: 'e4', a: 3, b: 4 },
      { id: 'e5', a: 4, b: 5 },
      { id: 'e6', a: 5, b: 3 },
      { id: 'e7', a: 1, b: 3 },
      { id: 'e8', a: 3, b: 5 }
    ],
    expectedCycles: [
      [1, 2, 3, 4, 5, 3, 1, 3, 5, 3, 2, 1]
    ]
  },
  {
    id: 7,
    name: "Octagon",
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
      { id: 'e8', a: 8, b: 1 }
    ],
    expectedCycles: [
      [1, 2, 3, 4, 5, 6, 7, 8, 1]
    ]
  },
  {
    id: 8,
    name: "Complete K4",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 150, y: 100 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 200, y: 180 },
      { id: 4, x: 200, y: 60 }
    ],
    edges: [
      { id: 'e1', a: 1, b: 2 },
      { id: 'e2', a: 1, b: 3 },
      { id: 'e3', a: 1, b: 4 },
      { id: 'e4', a: 2, b: 3 },
      { id: 'e5', a: 2, b: 4 },
      { id: 'e6', a: 3, b: 4 }
    ],
    expectedCycles: [
      [1, 2, 3, 1, 4, 2, 4, 3, 1]
    ]
  },
  {
    id: 9,
    name: "Two Triangles",
    difficulty: 'hard',
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
      { id: 'e9', a: 1, b: 6 }
    ],
    expectedCycles: [
      [1, 2, 3, 5, 6, 4, 5, 3, 6, 1, 3, 1]
    ]
  },
  {
    id: 10,
    name: "Complex Network",
    difficulty: 'hard',
    nodes: [
      { id: 1, x: 100, y: 100 },
      { id: 2, x: 200, y: 80 },
      { id: 3, x: 300, y: 100 },
      { id: 4, x: 300, y: 200 },
      { id: 5, x: 200, y: 220 },
      { id: 6, x: 100, y: 200 },
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
      { id: 'e14', a: 2, b: 5 }
    ],
    expectedCycles: [
      [1, 2, 7, 6, 5, 4, 3, 7, 2, 3, 4, 7, 5, 2, 1, 7, 4, 1, 6, 7, 3, 2, 1]
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
