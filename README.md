# Graph Cycle Challenge

An interactive touch-based graph cycle detection game. Draw cycles by touching and dragging along edges on predefined graph challenges.

## Features

- 🎮 **10 Challenging Levels**: From easy triangles to complex interconnected graphs
- 👆 **Touch-Based Drawing**: Draw cycles by touching and dragging on the screen (works on mobile, tablet, and desktop)
- ✅ **Automatic Validation**: Detects when you've found the correct cycle
- 🎉 **Progress Tracking**: Track completed challenges with visual indicators
- 🚀 **Auto-Advance**: Automatically moves to the next challenge when completed
- 📱 **Fullscreen Layout**: Optimized to fill your screen for the best drawing experience

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xhibition.git
cd xhibition
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`.

### Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment. The app will automatically deploy when you push to the `main` branch.

### Manual Deployment Steps

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/xhibition.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The site will be available at `https://yourusername.github.io/xhibition/`

## How to Play

1. Select a challenge from the grid
2. Touch and drag along the edges to draw your cycle path
3. The app automatically detects nodes as you pass over them
4. When you return to the starting node, it detects a cycle
5. If correct, you'll see a congratulations message and automatically move to the next challenge!

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- SVG for graph visualization

## Project Structure

```
xhibition/
├── src/
│   ├── GraphCycleTool.tsx  # Main component with touch drawing
│   ├── challenges.ts        # Predefined graph challenges
│   ├── App.tsx              # App wrapper
│   ├── main.tsx             # React entry point
│   └── index.css            # Tailwind CSS imports
├── public/
│   └── logo.svg             # Club logo
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## License

MIT
