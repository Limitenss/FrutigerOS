import React, { useState, useEffect } from 'react';

const GRID_SIZE = 10;
const MINES_COUNT = 15;

function Minesweeper() {
    const [grid, setGrid] = useState([]);
    const [status, setStatus] = useState('playing'); // playing, won, lost
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        let interval;
        if (status === 'playing') {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const initGame = () => {
        const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill().map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborCount: 0
        })));

        // Place mines
        let placed = 0;
        while (placed < MINES_COUNT) {
            const r = Math.floor(Math.random() * GRID_SIZE);
            const c = Math.floor(Math.random() * GRID_SIZE);
            if (!newGrid[r][c].isMine) {
                newGrid[r][c].isMine = true;
                placed++;
            }
        }

        // Count neighbors
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (newGrid[r][c].isMine) continue;
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (r + i >= 0 && r + i < GRID_SIZE && c + j >= 0 && c + j < GRID_SIZE) {
                            if (newGrid[r + i][c + j].isMine) count++;
                        }
                    }
                }
                newGrid[r][c].neighborCount = count;
            }
        }

        setGrid(newGrid);
        setStatus('playing');
        setTimer(0);
    };

    const reveal = (r, c) => {
        if (status !== 'playing' || grid[r][c].isRevealed || grid[r][c].isFlagged) return;

        const newGrid = [...grid.map(row => [...row])];
        if (newGrid[r][c].isMine) {
            setStatus('lost');
            revealAllMines(newGrid);
            return;
        }

        const revealRecursive = (row, col) => {
            if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || newGrid[row][col].isRevealed) return;
            newGrid[row][col].isRevealed = true;
            if (newGrid[row][col].neighborCount === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        revealRecursive(row + i, col + j);
                    }
                }
            }
        };

        revealRecursive(r, c);
        setGrid(newGrid);
        checkWin(newGrid);
    };

    const revealAllMines = (nextGrid) => {
        nextGrid.forEach(row => row.forEach(cell => {
            if (cell.isMine) cell.isRevealed = true;
        }));
        setGrid(nextGrid);
    };

    const toggleFlag = (e, r, c) => {
        e.preventDefault();
        if (status !== 'playing' || grid[r][c].isRevealed) return;
        const newGrid = [...grid.map(row => [...row])];
        newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
        setGrid(newGrid);
    };

    const checkWin = (nextGrid) => {
        const revealedCount = nextGrid.flat().filter(c => c.isRevealed).length;
        if (revealedCount === GRID_SIZE * GRID_SIZE - MINES_COUNT) {
            setStatus('won');
        }
    };

    return (
        <div className="minesweeper-app win7-glass" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 20 }}>
            <div className="minesweeper-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="minesweeper-stat win7-btn-glass" style={{ padding: '5px 15px', borderRadius: 4 }}>
                    💣 {MINES_COUNT - grid.flat().filter(c => c.isFlagged).length}
                </div>
                <button className="win7-btn-glass" onClick={initGame} style={{ padding: '5px 20px', fontSize: 20 }}>
                    {status === 'won' ? '😎' : status === 'lost' ? '😵' : '🙂'}
                </button>
                <div className="minesweeper-stat win7-btn-glass" style={{ padding: '5px 15px', borderRadius: 4 }}>
                    ⏱️ {timer}
                </div>
            </div>

            <div className="minesweeper-board" style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gap: 2,
                background: 'rgba(0,0,0,0.1)',
                padding: 2,
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                {grid.map((row, r) => row.map((cell, c) => (
                    <div 
                        key={`${r}-${c}`}
                        className={`mine-cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''} ${cell.isRevealed && cell.isMine ? 'mine' : ''}`}
                        onClick={() => reveal(r, c)}
                        onContextMenu={(e) => toggleFlag(e, r, c)}
                        data-count={cell.isRevealed && !cell.isMine ? cell.neighborCount : null}
                    >
                        {cell.isRevealed && cell.isMine && '💣'}
                        {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && cell.neighborCount}
                    </div>
                )))}
            </div>
            
            {status !== 'playing' && (
                <div style={{ marginTop: 20, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: status === 'won' ? '#008000' : '#ff0000' }}>
                    {status === 'won' ? 'You Won!' : 'Game Over!'}
                </div>
            )}
        </div>
    );
}

export default Minesweeper;
