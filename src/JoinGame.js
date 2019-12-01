import React, { Component } from "react"


const JoinGame = (props) => {
    // NOTE spread the props
    // const { parkName, parkDelete } = props
    // return (
    //     <div>
    //         <h2>this week's featured park is {parkName}</h2>
    //         <button onClick={parkDelete}>remove park</button>

    //         {props.children}
    //     </div>
    // )



    return (
        <div>
            <fieldset>
                <legend>Enter the game ID</legend>
                <input type="text" id="gameID" value={this.state.gameIDInput} onChange={this.handleChangeGameID}/>
                <button type="submit" value="joinGame">join game</button>
            </fieldset>
        </div>
    )
}


export default JoinGame;