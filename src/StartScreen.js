import React from "react";

const StartScreen = (props) => {
    const { submit, change, click } = props;
    return (
        <div className="wrapper">
            <h1>Blackjack Buddies</h1>
            <img src={require("./assets/welcomeScreenImage.png")} alt="Ace of spades and jack of spades playing cards" className="logoImage"/>
            <div className="instructions">
                <h3>Welcome to Blackjack Buddies</h3>
                <p>To begin a game, please enter your name in the form below and click the <span>new game</span> button</p>
                <p>Looking to join a friend's game? Simply enter your name in the form and click the <span>join a game</span> button</p>
            </div>
            <div className="fieldset">
            <fieldset>
                <legend>Enter your player name</legend>
                <form onSubmit={submit} className="nameForm">
                    <input type="text" id="playerName" onChange={change} placeholder="Type a player name here"/>
                    <button type="submit" value="newGame" className="button">new game</button>
                    <button type="button" value="joinAGame" onClick={click} className="button">join a game</button>
                </form>
            </fieldset>
            </div>
        </div>
    );
};

export default StartScreen;