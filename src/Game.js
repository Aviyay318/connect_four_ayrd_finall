import React from "react";
import GameSetting from "./GameSetting";
import GameBoard from "./GameBoard";
import Stats from "./Stats";
class Game extends React.Component{
state={
    player1:{name:"",color:"red",chip:0,score:0},
    player2:{name:"",color:"yellow",chip:0,score:0},
    board:[],
    row:4,
    column:4,
    startGame:false,
    isPlayerOneTurn : true,
    rowIndexOnBoard:[]
}
setBoardSize=(key,event)=>{
    this.setState({[key]:event.target.value})
}
setStartGame=(value)=>{
    this.setState({startGame:value})
    this.setMatrixBoard();
}
    setMatrixBoard = () => {
        const tempBoard = Array.from({ length: this.state.row }, () =>
            Array.from({ length: this.state.column }, () => ({ color: "white", painted: false }))
        );
        this.setState({ board: tempBoard });
    }
    setIndexBoard = () => {
        const tempArray = Array(this.state.column).fill(this.state.row - 1);
        this.setState({ indexBoard: tempArray });
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
    setMove=(col)=>{

    }
  render() {

      return(
          <div>
              {
                  this.state.startGame?
                      <div>
                          <div>
                              <div>
                                  Player turn: <label style={{color:this.state.isPlayerOneTurn?this.state.player1.color:this.state.player2.color}}> {this.state.isPlayerOneTurn?this.state.player1.name:this.state.player2.name}</label>
                              </div>
                              <button>Undo</button>
                              {/*<button>You You could’ve won</button>*/}
                              {/*<button>Reverse</button>*/}
                          </div>
                          <div>
                              <GameBoard board={this.state.board} setMove={this.setMove}/>
                          </div>
                          <div>
                            <Stats players={[this.state.player1,this.state.player2]} />
                          </div>
                          <div>
                              <button>Reset</button>
                              <button>New Game</button>
                          </div>
                      </div>:
                      <div>
                          <GameSetting players={[this.state.player1,this.state.player2]}
                                       row={this.state.row} column={this.state.column} setPlayerName={this.setPlayerName}
                                       setColor={this.setColor} setStartGame={this.setStartGame} setBoardSize={this.setBoardSize}/>
                      </div>

              }

          </div>
      )
  }

}
export default Game;