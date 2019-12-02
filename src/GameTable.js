// import React from "react";

// const GameTable = (props) => {
//     const { player1, player2, click } = props;

//     if (player1) {
//         return (
//             <div>
//                 <button onClick="click">ready</button>
//             </div>
//         )

//     }
// }

// export default GameTable;

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
        if (this.props.playersReady && this.props.player1) {
            return (
                <div>
                    <button onClick={this.props.clickDeal}>deal</button>
                </div>
            );
        } else if (this.props.playersReady && this.props.player2) {
            return (
                <div>
                    <h3>Waiting for the dealer to deal the cards...</h3>
                </div>
            )
        }
        
        if (this.props.player1) {
            this.setState({
                playerNumber: "player1"
            });
            return (
                <div>
                    <button onClick={ (event) => {this.props.click(event, this.state.playerNumber)} }>ready</button>
                </div>
            );
        } else if (this.props.player2) {
            this.setState({
                playerNumber: "player2"
            });
            return (
                <div>
                    <button onClick={(event) => { this.props.click(event, this.state.playerNumber) }}>ready</button>
                </div>
            );
        } else {
            return (
                null
            )
        }
    };
};

export default GameTable;