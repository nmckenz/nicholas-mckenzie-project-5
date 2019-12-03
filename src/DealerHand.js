import React, { Component } from "react"

class DealerHand extends Component {
    constructor() {
        super();
        this.state = {
            handValue: 0,
        }
    }

    componentDidMount() {
        const value = this.props.evaluateHand(this.props.cardValues);
        console.log("hand value", value);
        this.setState({
            handValue: value
        });
    }

    render() {
        return (
            <div className="cards">
                <div className="nameLabel">
                    <p>Dealer:</p>
                </div>
                <div className="card1">
                    <img src={this.props.cardImages[0]} alt="" />
                </div>
                <div className="card2">
                    <img src={this.props.cardImages[1]} alt="" />
                </div>
                <div className="value">
                    <p>Value: {this.state.handValue}</p>
                </div>
            </div>
        )
    }
}

export default DealerHand;