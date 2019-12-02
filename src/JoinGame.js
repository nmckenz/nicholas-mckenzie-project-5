import React from "react";


const JoinGame = (props) => {
    const { submit, change } = props;

    return (
        <div>
            <h1>Blackjack Buddies</h1>

            <fieldset>
                <legend>Enter the game ID</legend>
                <form onSubmit={submit}>
                    <input type="text" id="gameID" onChange={change}/>
                    <button type="submit" value="joinGame">join game</button>
                </form>
            </fieldset>
        </div>
    );
};


export default JoinGame;