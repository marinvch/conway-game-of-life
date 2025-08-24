type PlayerControlsProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onClear: () => void;
};

const PlayerControls = ({ isRunning, onStart, onStop, onReset, onClear }: PlayerControlsProps) => {
  return (
    <div className="player-controls">
      <button onClick={onStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={onStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={onReset}>
        Reset
      </button>
      <button onClick={onClear}>
        Clear
      </button>
    </div>
  )
}

export default PlayerControls