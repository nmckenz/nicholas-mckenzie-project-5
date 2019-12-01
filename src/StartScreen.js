import React from "react";

const StartScreen = (props) => {
    const { submit, change, click } = props;
    return (
        <div>
            <h1>Blackjack Buddies</h1>

            <fieldset>
                <legend>Enter your player name</legend>
                <form onSubmit={submit}>
                    <input type="text" id="playerName" onChange={change} />
                    <button type="submit" value="newGame">new game</button>
                    <button type="button" value="joinAGame" onClick={click}>join a game</button>
                </form>
            </fieldset>
        </div>
    );
};

export default StartScreen;