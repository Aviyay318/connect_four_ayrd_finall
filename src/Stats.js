import React from "react";
import "./Game.css"
function Stats(props) {
    return (
        <div>
            <div>
                {
                    <table id={"stats-table"}>
                        <tr>
                            <th colSpan={"3"}>Stats</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Chips</td>
                            <td>Score</td>
                        </tr>
                        {
                            props.players.map((player, indexPlayer) => {
                                return (
                                    <tr>
                                        <td>{player.name}:</td>
                                        <td>{player.chip}</td>
                                        <td>{player.score}</td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                }
            </div>
        </div>
    )
}export default Stats;