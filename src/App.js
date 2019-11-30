import React, { Component } from 'react';
import firebase from "./firebase.js"
import axios from "axios"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      blackjack: [],
      // game: {
      //   gameID: "",
      //   cardsRemaining: 52,
      //   shuffled: false,
      // },
      game: {},
    }
  }

  componentDidMount() {
    // FIREBASE======================================
    const dbRef = firebase.database().ref();

    dbRef.on("value", (snapshot) => {
      const database = snapshot.val()
      console.log("database snapshot", snapshot)
      console.log("database on change", database)
    })
    // ==============================================

    // AXIOS=========================================
    axios({
      url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
      method: `GET`,
      dataResponse: `json`
    }).then((result) => {
      console.log("cards api result", result)
      this.setState({
        // game.gameID: result.data.deck_id
        // game.cardsRemaining: result.data.remaining
        // game.shuffled: result.data.shuffled
        game: result.data

      })

    })
    // ==============================================


  }


  handleChange = (event) => {
    console.log("handleChange event target value", event.target.value)
    this.setState({
      playerName: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log("submit event", event)
    console.log("submit event value", event.target);
  }



  render() {
    // console.log("game state in render", this.state.game)
    return (
      <div className="App">
        <h1>Blackjack Buddies</h1>

        <h2>gameID: {this.state.game.deck_id}</h2>
        <h3>cards remaining: {this.state.game.remaining}</h3>
        <h3>shuffled: {String(this.state.game.shuffled)}</h3>
        
        <fieldset>
          <legend>Enter your player name</legend>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="playerName" value={this.state.playerNameInput} onChange={this.handleChange}/>
            <button type="submit" value="newGame">new game</button>
            <button type="submit" value="joinGame">join a game</button>
          </form>
        </fieldset>
        {/* {
          for (let item in this.state.game) {
            return(
              <div className="gameData">
                <h2>Game ID: {</h2>
              </div>
            )
          }
        } */}

      </div>
    );

  }
}

export default App;
