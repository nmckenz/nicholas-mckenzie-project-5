import React from "react";


const JoinGame = (props) => {
    const { submit, change } = props;

    return (
        <div className="wrapper">
            <h1>Blackjack Buddies</h1>
            <img src={require("./assets/welcomeScreenImage.png")} alt="Ace of spades and jack of spades playing cards" className="logoImage" />
            <div className="instructions">
                <h3>Blackjack Buddies - Join a Game</h3>
                <p>Please enter the game ID in the form and click the <span>join game</span> button</p>
            </div>
            <div className="fieldset">
                <fieldset>
                    <legend>Enter the game ID</legend>
                    <form onSubmit={submit} className="joinForm">
                        <input type="text" id="gameID" onChange={change} placeholder="Please enter game ID"/>
                        <button type="submit" value="joinGame" className="button">join game</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};


export default JoinGame;