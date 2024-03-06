import './GameBoard.css';
function GameBoard(props){
    const board = props.board;

    return(
        <div>
            <h1>Game Board</h1>
            <div className={"firstDiv"}>
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