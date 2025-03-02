# Rocket_game - 2D Cellular Automata Game

## Project Description

Rocket_game is a 2D game based on cellular automata and the ECS (Entity Component System) architecture. The project is built in TypeScript and runs in the browser as a web application.

## Technologies

- **Language**: TypeScript
- **Architecture**: ECS (Entity Component System)
- **Simulation Engine**: Cellular Automata
- **Rendering**: Canvas API

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/sebaw65/rocket_game.git
   cd rocket_game
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the development server**
   ```sh
   npm run dev
   ```

## Directory Structure

```
📂 rocket_game
├── 📂 src          # Game source code
│   ├── 📂 core     # Core files with game loop
│   ├── 📂 systems  # Game systems (rendering, physics, etc.)
│   ├── 📂 components # ECS components
│   ├── 📂 entities   # Entity definitions
│   ├── 📜 game.ts   # Connecting the engine to the html file
├── 📂 public       # Static files
├── 📜 index.html   # Main application page
├── 📜 package.json # Dependencies and scripts
```

## Future Features

- GUI
- more materials with individual physics (map creator)
- player model and controls
- ... more
