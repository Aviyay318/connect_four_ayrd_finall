import "./GameSettings.css"
function GameSetting(props) {
    const players = props.players;
    const colors = ["red","yellow","blue","black","pink","green"];
    function validBoardSize(){
        let result;
        (props.column<4||props.column>10||props.row<4||props.row>10)?result=true:result=false;
        return result;
    }

    const zoomInOnEnter=(event)=>{
        event.currentTarget.style.animation = "colorPickerZoomInAnimation 0.1s ease"
        event.currentTarget.style.animationFillMode="forwards"
        event.currentTarget.style.animationDelay = "0.1s"
    }
    const zoomOutOnExit = (event) => {
        event.currentTarget.style.animation = "colorPickerZoomOutAnimation 0.2s ease"
    }

    return(
        <div id={"game-settings-container"}>
         {/*<h1>Game Setting</h1>*/}
            <h2>Player Settings:</h2>
            <div>
                <table id={"player-settings-table"}>
                    <tr>
                        <td></td>
                        <td className={"player-settings-table-header"}><h1>Name</h1></td>
                        <td className={"player-settings-table-header"}><h1>Choose Color</h1></td>
                        <td className={"player-settings-table-header"}><h1>Current Color</h1></td>
                    </tr>
                    {
                        players.map((player,playerIndex)=>{
                            return(
                                <tr>
                                    <td className={"player-settings-table-header"}><h1>Player{playerIndex+1}</h1></td>
                                    <td><input style={player.name.length===0?{boxShadow:"0 0 15px red"}:{boxShadow:"0 0 15px green"}} placeholder={"Enter your name"} className={"player-settings-input-field"} type={"text"} value={player.name} onChange={(event)=>{props.setPlayerName("player"+(playerIndex+1),event)}}/>
                                        <br/>
                                        {player.name.length===0&&<label style={{color:"red",fontSize:20}}>Enter name please!</label>}</td>
                                    <td id={"choose-color-col"}>{
                                        colors.map((color)=>{
                                            return(
                                                <div onMouseEnter={zoomInOnEnter} onMouseLeave={zoomOutOnExit} onClick={()=>props.setColor("player"+(playerIndex+1),color)} style={{backgroundColor:color ,width:50, height:50, borderRadius:50, display:"inline-flex"}}></div>
                                            )})
                                    }</td>
                                    <td id={"current-color-col"}><span  style={{backgroundColor:player.color ,width:50, height:50, borderRadius:50, display:"inline-flex"}}></span></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <h2>Board Settings:</h2>
            <label>Please choose a row or column between 4 and 10!</label>
         <div id={"board-settings-container"}>
             <div>
                 <h3 className={"board-settings-table-header-header"}>Column: </h3> <input className={"board-settings-input-field"} style={props.column===0?{boxShadow:"0 0 15px red"}:{boxShadow:"0 0 15px green"}} type={"number"} value={props.column} onChange={(event)=>{props.setBoardSize("column",event)}}/>
             </div>
             <div>
                 <h3 className={"board-settings-table-header-header"}>Row: </h3> <input className={"board-settings-input-field"} style={props.row===0?{boxShadow:"0 0 15px red"}:{boxShadow:"0 0 15px green"}} type={"number"} value={props.row} onChange={(event)=>{props.setBoardSize("row",event)}}/>
             </div>
         </div>
         <button id={"start-game-button"} disabled={validBoardSize()||players[0].name.length===0||players[1].name.length===0} onClick={()=>props.startGame(true)}>Start Game</button>
        </div>
    )

}
export default GameSetting;