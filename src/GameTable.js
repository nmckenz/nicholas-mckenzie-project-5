import React, { Component } from "react";

class GameTable extends Component {
    constructor() {
        super();
        this.state = {
            playerNumber: ""
        }
    }

    // const { player1, player2, click } = props;

    
    render() {
        console.log("player 1 cards", this.props.player1Cards)
        console.log("player 2 cards", this.props.player2Cards)
        console.log("players ready", this.props.playersReady)
        const card1ImageElement = `<img src="${this.props.card1}"/>`
        const card2ImageElement = `<img src="${this.props.card2}"/>`

        if (this.props.playersReady && this.props.player1 && !this.props.player1Cards) {
            return (
                <div>
                    <button onClick={this.props.clickDeal}>deal</button>
                </div>
            );
        } else if (this.props.playersReady && this.props.player2 && !this.props.player2Cards) {
            return (
                <div>
                    <h3>Waiting for the dealer to deal the cards...</h3>
                </div>
            )
        } else if (this.props.playersReady && this.props.player1 && this.props.player1Cards && this.props.player2Cards) {
            if (!this.props.player1HasImages) {
                this.props.cardImages("player1")
                return (
                    <h1>images func is getting by...</h1>
                )
            } else {
                return (
                    <div>{card1ImageElement}{card2ImageElement}</div>
                )
            }
        } else if (this.props.playersReady && this.props.player2 && this.props.player1Cards && this.props.player2Cards) {
            if (!this.props.player2HasImages) {
                this.props.cardImages("player2")
                return (
                    <h1>images func is also getting by here...</h1>
                )
            } else {
                return (
                    <h1>have images</h1>
                )
            }
        } else {
            return (
                null
            )
        }
        
        // if (this.props.player1) {
        //     this.setState({
        //         playerNumber: "player1"
        //     });
        //     return (
        //         <div>
        //             <button onClick={ (event) => {this.props.click(event, this.state.playerNumber)} }>ready</button>
        //         </div>
        //     );
        // } else if (this.props.player2) {
        //     this.setState({
        //         playerNumber: "player2"
        //     });
        //     return (
        //         <div>
        //             <button onClick={(event) => { this.props.click(event, this.state.playerNumber) }}>ready</button>
        //         </div>
        //     );
        // } else {
        //     return (
        //         null
        //     )
        // }
    };
};

export default GameTable;