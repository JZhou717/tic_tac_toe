import React from 'react';
import ReactDOM from 'react-dom';
import'./index.css'

/**
 * This is a tutorial application working with the reactjs.org tutorial tic_tac_toe
 */

/**
 * We started learning with an existing class component for Square
 * We later replaced it with a functional component, it is a simpler way to create components that are controlled
 * components (the Board has full control of them) and because they do not need to maintain their own state
 * It's interesting to see the changes
 *      since Square is now a function, we must remove references to "this"
 *      Also notice how onClick has changed significantly to use the reference to the function directly instead of a
 *      call to the reference stored in the props
 */
// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={()=> this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }
function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.board[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                board: Array(9).fill(null)
            }],
            oIsNext: true,
            winner: null
        }
    }

    render() {
        let current = this.state.history[this.state.history.length - 1];
        let status;
        if(this.state.winner)
            status = this.state.winner === 'tie' ? "Tie" : `${this.state.winner} won!`;
        else
            status = `Next player: ${this.state.oIsNext ? "O": "X"}`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        board={current.board}
                        onClick ={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    handleClick = i => {
        let current_board = this.state.history[this.state.history.length - 1].board;
        if(current_board[i] != null || this.state.winner != null)
            return;

        // create copy of the board array in the state
        let new_board = current_board.slice();
        new_board[i] = this.state.oIsNext ? "O" : "X";
        let turn_winner = this.checkWin(new_board, i);

        this.setState({
            history: this.state.history.concat([
                {board: new_board}
            ]),
            oIsNext: !this.state.oIsNext,
            winner: turn_winner
        });
    }

    checkWin = (board, i) => {
        if(i < 0 || i > board.length)
            return null;

        // check row
        let row_start = Math.floor(i/3) * 3;
        if(board[row_start] && board[row_start] === board[row_start + 1] && board[row_start] === board[row_start + 2])
            return board[row_start];
        // check column
        let col_start = i % 3;
        if(board[col_start] && board[col_start] === board[col_start + 3] && board[col_start] === board[col_start + 6])
            return board[col_start];
        //check \ diagonal
        if(board[0] && board[0] === board[4] && board[0] === board[8])
            return board[0];
        // check / diagonal
        if(board[2] && board[2] === board[4] && board[2] === board[6])
            return board[2]

        // check tie if all positions played
        for(let j = 0; j < board.length; j++) {
            // position j has not been filled - no tie
            if(!board[j]) {
                return null;
            }
        }
        return "tie";

    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
