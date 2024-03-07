import React from "react";
import "./Game.css";
import GameSetting from "./GameSetting";
import GameBoard from "./GameBoard";
import Stats from "./Stats";
class Game extends React.Component{
    state={
        player1:{name:"Aviya",color:"red",chip:0,score:0},
        player2:{name:"Ram",color:"yellow",chip:0,score:0},
        board:[],
        row:4,
        column:4,
        startGame:false,
        isPlayerOneTurn : true,
        rowIndexOnBoard:[],
        lastMove:{row:"",column:""},
        connectFourWin:4,
        winning:{winner:"",won:false,draw:false},
        draw:0
    }
    setBoardSize=(key,event)=>{
        this.setState({[key]:event.target.value})
    }
    startGame=(value)=>{
        this.setState({startGame:value})
        this.setMatrixBoard();
        this.setIndexBoard()
    }
    setMatrixBoard = () => {
        const tempBoard = Array.from({ length: this.state.row }, () =>
            Array.from({ length: this.state.column }, () => ({ color: "transparent", painted: false }))
        );
        this.setState({ board: tempBoard });
    }
    setIndexBoard=()=>{
        const tempArray = [];
        for (let i=0;i<this.state.column;i++){
            tempArray[i]=this.state.row-1;
        }
        this.setState({rowIndexOnBoard:tempArray})
    }

    setColor=(player,color)=>{
        const currentPlayer = player==="player1"?this.state.player1:this.state.player2
        const previousPlayer  = player==="player1"?this.state.player2:this.state.player1;
        previousPlayer.color===color?alert("color taken"):currentPlayer.color = color;
        player==="player1"?this.setState({player1:currentPlayer}):this.setState({player2:currentPlayer})
    }
    setPlayerName=(type,event)=>{
        const playerName = type==="player1"?this.state.player1:this.state.player2;
        playerName.name = event.target.value;
        type==="player1"?this.setState({player1:playerName}):this.setState({player2:playerName})

    }
    setMove=(colIndex)=>{
        let draw= this.state.draw;
        const tempBoard= this.state.board;
        const tempRowIndexOnBoard = this.state.rowIndexOnBoard;
        const row = tempRowIndexOnBoard[colIndex];
        const cell = tempBoard[tempRowIndexOnBoard[colIndex]][colIndex];//find the cell in the column that not painted
        if (!cell.painted){
            cell.color=this.getCurrentPlayerColor()
            cell.painted=true;
            const player =  this.state.isPlayerOneTurn?this.state.player1:this.state.player2
            player.chip++;
            draw++;
            tempRowIndexOnBoard[colIndex]>0&&tempRowIndexOnBoard[colIndex]--
            this.state.isPlayerOneTurn?this.setState({Player1:player}):this.setState({Player2:player})
            this.setState({board:tempBoard,draw:draw,isPlayerOneTurn:!this.state.isPlayerOneTurn,rowIndexOnBoard:tempRowIndexOnBoard,lastMove:{row:row,column:colIndex}},()=>{
                this.checkWinner();
            })

        }else{
            alert("The cell is busy, choose another cell please!")
        }


    }
    checkWinner = () => {
        this.checkRow();
        if (!this.state.winning.won) {
            this.checkCol();
        }
        if (!this.state.winning.won) {
            this.checkDiagonalsForWin();
        }
        if (this.state.draw === this.state.row * this.state.column) {
            this.setState({ winning: { winner: "", won: false, draw: true } });
        }

        console.log(this.state.winning);
    }

    getCurrentPlayerColor=()=>{
      return this.state.isPlayerOneTurn?this.state.player1.color:this.state.player2.color
    }
    checkDiagonalsForWin = () => {
        const { row, column, board} = this.state;
        for (let i = 0; i < row - 3; i++) {
            for (let j = 0; j < column - 3; j++) {
                const color = board[i][j].color;
                if (color !== 'transparent' &&
                    color === board[i + 1][j + 1].color &&
                    color === board[i + 2][j + 2].color &&
                    color === board[i + 3][j + 3].color) {
                   this.setWinner(color)

                }
            }
        }
        for (let i = 0; i < row - 3; i++) {
            for (let j = column - 1; j >= 3; j--) {
                const color = board[i][j].color;
                if (color !== 'transparent' &&
                    color === board[i + 1][j - 1].color &&
                    color === board[i + 2][j - 2].color &&
                    color === board[i + 3][j - 3].color) {
                    this.setWinner(color)
                }
            }
        }


    }

    // startCountdown() {
    //     this.countdownTimer = setTimeout(() => {
    //         if (this.state.countdown > 0) {
    //             this.setState(prevState => ({
    //                 countdown: prevState.countdown - 0.5
    //             }), this.startCountdown);
    //         }
    //     }, 1000);
    // }

    checkCol=()=>{
        let counter=1;
        let color="transparent";
        const col=this.state.lastMove.column;
        for (let i=0;i<this.state.row-1;i++) {
            if (this.state.board[i][col].color!=="transparent")
            {
               this.state.board[i][col].color===this.state.board[i+1][col].color? counter++: counter=1;
            if (counter===this.state.connectFourWin){
                color=this.state.board[this.state.lastMove.column][i].color;
                this.setWinner(color)

            }
        }}}
    setWinner=(color)=>{
        let winner=""
        color===this.state.player1.color?winner=this.state.player1:winner=this.state.player2;
        winner.score++;
        this.state.isPlayerOneTurn?this.setState({player2:winner}):this.setState({player1:winner})
        this.setState({  winning:{winner:winner.name,won:true,draw:false}
        })
    }
    checkRow=()=>{
        let counter=1;
        let color="transparent";
        const row=this.state.lastMove.row;
        for (let i=0;i<this.state.column-1;i++) {
            if (this.state.board[row][i].color!=="transparent") {
                this.state.board[row][i].color===this.state.board[row][i+1].color? counter++ : counter=1;
            if (counter===this.state.connectFourWin){
                color=this.state.board[this.state.lastMove.row][i].color;
                this.setWinner(color)
            }
        }

   }
}
    newGame=()=>{
        this.startGame();
        this.setState({player1:{name:"",color:"red",chip:0,score:0},
            player2:{name:"",color:"yellow",chip:0,score:0}})
    }
    undo=()=>{
        const board = this.state.board;
        let draw = this.state.draw;
        draw--;
        board[this.state.lastMove.row][this.state.lastMove.column].color="transparent";
        board[this.state.lastMove.row][this.state.lastMove.column].painted=false;
        const tempRowIndexOnBoard = this.state.rowIndexOnBoard;
        tempRowIndexOnBoard[this.state.lastMove.column]++;
        this.setState({isPlayerOneTurn:!this.state.isPlayerOneTurn,rowIndexOnBoard:tempRowIndexOnBoard,draw:draw})

    }
    render() {

        return(
            <div>
                {
                    this.state.startGame?
                        <div>
                            <div>
                                {
                                    this.state.winning.draw?
                                        <div>
                                            <h1>No one won</h1>
                                        </div>
                                : this.state.winning.won?
                                     <div>
                                         <h1>The Winner: {this.state.winning.winner}</h1>
                                     </div>:
                                        <div>
                                            <h1>Player turn:  <label style={{color:this.state.isPlayerOneTurn?this.state.player1.color:this.state.player2.color}}> {this.state.isPlayerOneTurn?this.state.player1.name:this.state.player2.name}</label></h1>
                                        </div>
                                }
                                {/*<button>You You could’ve won</button>*/}
                                {/*<button>Reverse</button>*/}
                            </div>
                            <div id={"game-container"}>
                                <div id={"stats-table"}>
                                    <Stats players={[this.state.player1,this.state.player2]} />
                                </div>

                                <div id={"game-board"}>
                                    <GameBoard board={this.state.board} getCurrentPlayerColor={this.getCurrentPlayerColor}setMove={this.setMove}/>
                                </div>

                                <div id={"buttons"}>
                                    <button style={styles.button} onClick={()=>this.undo()}>Undo</button>
                                    <button style={styles.button} onClick={()=>{this.setMatrixBoard();this.setIndexBoard()}}>Reset</button>
                                    <button style={styles.button} onClick={()=>this.newGame()}>New Game</button>
                                </div>
                            </div>
                        </div>:
                        <div>
                            <GameSetting players={[this.state.player1,this.state.player2]}
                                         row={this.state.row} column={this.state.column} setPlayerName={this.setPlayerName}
                                         setColor={this.setColor} startGame={this.startGame} setBoardSize={this.setBoardSize}/>
                        </div>

                }

            </div>
        )
    }


}
const styles={
    button:{width: 100, height: 50, border: "1 solid white"}
}
export default Game;