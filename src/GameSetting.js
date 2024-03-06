function GameSetting(props) {
    const players = props.players;
    const colors = ["red","yellow","blue","black","pink","green"];
    function validBoardSize(){
        let result;
        (props.column<4||props.column>10||props.row<4||props.row>10)?result=true:result=false;
        return result;
    }
    return(
        <div>
         <h1>Game Setting</h1>
            <h2>Set your board and game</h2>
            <div>
                <table id={"settings-table"}>
                    <tr>
                        <td></td>
                        <td><h3>Name</h3></td>
                        <td><h3>Color</h3></td>
                        <td><h3>Change Color</h3></td>
                    </tr>
                    {
                        players.map((player,playerIndex)=>{
                            return(
                                <tr>
                                    <td><h2>Player{playerIndex+1}</h2></td>
                                    <td><input type={"text"} value={player.name} onChange={(event)=>{props.setPlayerName("player"+(playerIndex+1),event)}}/>
                                        <br/>
                                        {player.name.length===0&&<label style={{color:"red"}}>Enter there please!</label>}</td>
                                    <td>{
                                        colors.map((color)=>{
                                            return(
                                                <div onClick={()=>props.setColor("player"+(playerIndex+1),color)} style={{backgroundColor:color ,width:50, height:50, borderRadius:50, display:"inline-flex"}}></div>
                                            )})
                                    }</td>
                                    <td><span  style={{backgroundColor:player.color ,width:50, height:50, borderRadius:50, display:"inline-flex"}}></span></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
         <div>
             <h2>Board size:</h2>
             <div>
                 <span>column: </span> <input type={"number"} value={props.column} onChange={(event)=>{props.setBoardSize("column",event)}}/>
             </div>
             <div>
                 <span>Row: </span> <input type={"number"} value={props.row} onChange={(event)=>{props.setBoardSize("row",event)}}/>
             </div>
             {validBoardSize()&&<label style={{color:"red"}}>Please choose a row or column between 4 and 10!</label>}

         </div>
         <button disabled={validBoardSize()||players[0].name.length===0||players[1].name.length===0} onClick={()=>props.setStartGame(true)}>Start Game</button>
        </div>
    )

}
export default GameSetting;