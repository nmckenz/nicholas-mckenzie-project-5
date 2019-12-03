import React from "react";


const WaitingForPlayer = () => {

    return (
        <div className="wrapper">
            <h1>Blackjack Buddies</h1>
            <img src={require("./assets/welcomeScreenImage.png")} alt="Ace of spades and jack of spades playing cards" className="logoImage" />
            <div className="instructions">
                <h3>Shuffling Deck</h3>
                <p>Waiting for other player</p>
            </div>
        </div>
    );
};


export default WaitingForPlayer;