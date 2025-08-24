type GameBoardProps = {
  canvas: number[][];
  onCellClick: (row: number, col: number) => void;
  isRunning: boolean;
}

const GameBoard = ({ canvas, onCellClick, isRunning }: GameBoardProps) => {
  return (
    <div className='canvas'>
      {canvas.map((row: number[], rowIdx: number) => {
        return (
          <div key={rowIdx} className="row">
            {row.map((cell: number, colIdx: number) => (
              <span
                key={colIdx}
                className={`col ${cell ? 'isAlive' : ''}`}
                onClick={() => onCellClick(rowIdx, colIdx)}
                style={{
                  cursor: isRunning ? 'default' : 'pointer',
                  opacity: isRunning ? 0.8 : 1
                }}
              >
                {cell}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  )
}

export default GameBoard