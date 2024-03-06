import './GameBoard.css';
function GameBoard(props){
    const board = props.board;

    const setStyleColor = {
        "--color": props.getCurrentPlayerColor()
    }

    return(
        <div>
            <div id={"board"} className={"firstDiv"} style={setStyleColor}>
            {
                board.map((row,rowIndex)=>{
                    return(
                       <div>
                           {
                               row.map((col,colIndex)=>{
                                   return(
                                       <div className={"square"}>
                                           <span style={{background:col.color }} onClick={()=>{props.setMove(colIndex)}} className={"circle"} ></span>
                                       </div>
                                   )
                               })
                           }
                       </div>
                    )
                })
            }
            </div>
        </div>
    )

}export default GameBoard;