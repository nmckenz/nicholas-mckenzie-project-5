import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlayerHand from "./PlayerHand.js"
import DealerHand from "./DealerHand.js"

class GameTable extends Component {
    constructor() {
        super();
        this.state = {
            playerNumber: ""
        }
    }

    // const { player1, player2, click } = props;

    
    render() {
        // console.log("player 1 cards", this.props.player1Cards)
        // console.log("player 2 cards", this.props.player2Cards)
        // console.log("players ready", this.props.playersReady)
        const card1ImageElement = `<img src="${this.props.player1CardImages.card1}"/>`
        const card2ImageElement = `<img src="${this.props.player1CardImages.card2}"/>`

        if (this.props.playersReady && this.props.player1 && !this.props.player1Cards) {
            return (
                <div className="wrapper">
                    <div>
                        <h1>Blackjack Buddies</h1>
                        <img src={require("./assets/welcomeScreenImage.png")} alt="Ace of spades and jack of spades playing cards" className="logoImage" />
                    </div>
                    {/* <FontAwesomeIcon icon="window-close" /> */}
                    <div className="instructions">
                        <h3>As soon as you're feeling lucky hit the <span>deal</span> button.</h3>
                        <h3>Not your time to shine? Hit the <span>end game</span> button</h3>
                        <button onClick={this.props.clickDeal} className="button">deal</button>
                        <button onClick={this.props.endGame} className="button">end game</button>
                    </div>
                </div>
            );
        } else if (this.props.playersReady && this.props.player2 && !this.props.player2Cards) {
            return (
                <div className="wrapper">
                    <div>
                        <h1>Blackjack Buddies</h1>
                        <img src={require("./assets/welcomeScreenImage.png")} alt="Ace of spades and jack of spades playing cards" className="logoImage" />
                    </div>
                    <div className="instructions">
                        <h3>Waiting for the dealer to deal the cards...</h3>
                    </div>
                </div>
            )
        } else if (this.props.playersReady && this.props.player1 && this.props.player1Cards && this.props.player2Cards) {
            if (!this.props.player1HasImages) {
                this.props.cardImages("player1")
                setTimeout(() => {
                    this.props.cardImages("dealer")
                }, 1000)

                return (
                    <div>
                        <button onClick={this.props.endGame}>end game</button>
                        <h1>images func is getting by...</h1>
                    </div>
                )
            } else {
                return (
                    <div>
                        <button onClick={this.props.endGame} className="button">end game</button>
                        <DealerHand 
                        cardValues={this.props.dealerCardValues}
                        cardImages={this.props.dealerCardImages}
                        evaluateHand={this.props.evaluateHand}
                        />
    
                        <PlayerHand 
                        cardValues={this.props.player1CardValues}
                        cardImages={this.props.player1CardImages}
                        evaluateHand={this.props.evaluateHand}
                        />
                    </div>
                )
            }
        } else if (this.props.playersReady && this.props.player2 && this.props.player1Cards && this.props.player2Cards) {
            if (!this.props.player2HasImages) {
                this.props.cardImages("player2")
                return (
                    <div>
                        <button onClick={this.props.endGame}>end game</button>
                        <h1>images func is also getting by here...</h1>
                    </div>
                )
            } else {
                return (
                    <div>
                        <button onClick={this.props.endGame}>end game</button>
                        <h1>have images</h1>
                    </div>
                )
            }
        } else {
            return (
                null
            )
        }
    };
};

export default GameTable;