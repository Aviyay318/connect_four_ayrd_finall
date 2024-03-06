import React from "react";
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
        winning:{winner:"",won:false,draw:false}
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
        const tempBoard= this.state.board;
        const tempRowIndexOnBoard = this.state.rowIndexOnBoard;
        const row = tempRowIndexOnBoard[colIndex];
        const cell = tempBoard[tempRowIndexOnBoard[colIndex]][colIndex];//find the cell in the column that not painted
        if (!cell.painted){
            cell.color=this.getCurrentPlayerColor()
            cell.painted=true;
            const player =  this.state.isPlayerOneTurn?this.state.player1:this.state.player2
            player.chip++;
            tempRowIndexOnBoard[colIndex]>0&&tempRowIndexOnBoard[colIndex]--
            this.state.isPlayerOneTurn?this.setState({Player1:player}):this.setState({Player2:player})
            this.setState({board:tempBoard,isPlayerOneTurn:!this.state.isPlayerOneTurn,rowIndexOnBoard:tempRowIndexOnBoard,lastMove:{row:row,column:colIndex}},()=>{
                this.checkWinner();
            })

        }else{
            alert("The cell is busy, choose another cell please!")
        }


    }
  render() {

        return(
            <div>
                {
                    this.state.startGame?
                        <div>
                            <div>
                                {
                                    this.state.winning.won?
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
                                    <button onClick={()=>this.undo()}>Undo</button>
                                    <button onClick={()=>{this.setMatrixBoard();this.setIndexBoard()}}>Reset</button>
                                    <button onClick={()=>this.newGame()}>New Game</button>
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
export default Game;