import styles from './app.module.scss';
import Square from './components/square/Square';
import useLocalStorage from './utils/useLocalStorage';

function App() {
    const { gameBoard } = styles;

    const [ticTacToe, setTicTacToe] = useLocalStorage('tic-tac-toe', {
        squares: [Array(9).fill(null)],
        currentStep: 0
    });
    
    const { squares, currentStep } = ticTacToe;

    const currentSquares = squares[currentStep];

    function selectSquare(square) {
       if(currentSquares[square] || calculateWinner(currentSquares) ) return;
       const newSquares = [...currentSquares];
       newSquares[square] = calculateNextValue(currentSquares);
       setTicTacToe({
           squares: [...squares, newSquares],
           currentStep: currentStep + 1
       })
    }

    function  calculateNextValue(squares) {
        return squares.filter(Boolean).length % 2 === 0 ? 'X' : '0';
    }

    function calculateWinner(squares) {
        const winnerConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for( let i = 0; i < winnerConditions.length; i++) {
            const [a, b, c] = winnerConditions[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }

        return null
    }

    function calculateStatus(squares) {
        const winner = calculateWinner(squares);
        const nextPlayer = calculateNextValue(squares);
        return winner ? `The winner is ${winner}` : `Next Player ${nextPlayer}`;
    }

    function GameStatus() {
        const statusMessage = calculateStatus(currentSquares);
        return <>
            {statusMessage}
        </>
    }

    function restart() {
        setTicTacToe({
            currentStep: 0,
            squares: [Array(9).fill(null)]
        })
    };

    return (
        <>
            <div className="status">
                <GameStatus />
            </div>
            <div className={gameBoard}>
                <Square count={0} onClick={selectSquare} data={currentSquares} />
                <Square count={1} onClick={selectSquare} data={currentSquares} />
                <Square count={2} onClick={selectSquare} data={currentSquares} />
                <Square count={3} onClick={selectSquare} data={currentSquares} />
                <Square count={4} onClick={selectSquare} data={currentSquares} />
                <Square count={5} onClick={selectSquare} data={currentSquares} />
                <Square count={6} onClick={selectSquare} data={currentSquares} />
                <Square count={7} onClick={selectSquare} data={currentSquares} />
                <Square count={8} onClick={selectSquare} data={currentSquares} />
            </div>
            <button onClick={restart}>Restart Game!</button>
        </>
    );
}

export default App;
