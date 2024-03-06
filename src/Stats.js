import React from "react";

function Stats(props) {
    return (
        <div>
            <h3>State</h3>
            <div>
                {
                    <table>
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