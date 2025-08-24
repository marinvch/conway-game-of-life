
import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import PlayerControls from './components/PlayerControls';
import GameBoard from './components/GameBoard';
import { gameField, getNextGeneration, createEmptyGrid, totalPopulation } from './gameEngine';

const ROWS = 15;
const COLS = 15;

function App() {
  const [grid, setGrid] = useState<number[][]>(() => gameField(ROWS, COLS));
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to advance to next generation
  const nextGeneration = () => {
    setGrid(currentGrid => getNextGeneration(currentGrid));
    setGeneration(gen => gen + 1);
  };

  // Start the game
  const startGame = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        nextGeneration();
      }, 300); // Update every 300ms
    }
  };

  // Stop the game
  const stopGame = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset the game with random state
  const resetGame = () => {
    stopGame();
    setGrid(gameField(ROWS, COLS));
    setGeneration(0);
  };

  // Clear the grid
  const clearGrid = () => {
    stopGame();
    setGrid(createEmptyGrid(ROWS, COLS));
    setGeneration(0);
  };

  // Toggle cell state when clicked
  const toggleCell = (row: number, col: number) => {
    if (!isRunning) {
      setGrid(currentGrid => {
        const newGrid = currentGrid.map(r => [...r]);
        newGrid[row][col] = newGrid[row][col] ? 0 : 1;
        return newGrid;
      });
    }
  };

  // Start the game automatically when component mounts
  useEffect(() => {
    startGame();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const population = totalPopulation(grid);

  return (
    <div className="App">
      <h1 className="title">Conway's Game of Life</h1>
      <div className="stats">
        <p>Generation: {generation} | Population: {population}</p>
      </div>
      <div className='board'>
        <PlayerControls
          isRunning={isRunning}
          onStart={startGame}
          onStop={stopGame}
          onReset={resetGame}
          onClear={clearGrid}
        />
        <GameBoard
          canvas={grid}
          onCellClick={toggleCell}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}

export default App;
