import React, { Component } from 'react';
import firebase from "./firebase.js"
import { Animated } from "react-animated-css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
      game: null,
      playerName: "",
      gameIDInput: "",
    };
  };

  componentDidMount() {
    // FIREBASE======================================
    const dbRef = firebase.database().ref();

    dbRef.on("value", (snapshot) => {
      const database = snapshot.val()
      console.log("database snapshot", snapshot)
      console.log("database on change", database)
    })
    // ==============================================
  };



  // AXIOS==============================================
    // call api for new deck on game start--------------
  async getData() {
    const result = await axios({
      url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
      method: `GET`,
      dataResponse: `json`
    });
    return await result
  };
  // ====================================================

  
  
  // PLAYER NAME==========================================
    // read user input for name and save to state--------
  handleChangePlayerName = (event) => {
    this.setState({
      playerName: event.target.value
    });
  };
  // ========================================================
  


  // NAME CHECK ERROR DIALOG=================================
    // error dialog window displayed if user does not input a name
  nameCheck = () => {
    Swal.fire({
      icon: 'error',
      title: 'Please enter a user name to begin',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
  };



  // NEW GAME================================================
    // user wants to start new game---------------------------
  handleSubmit = (event) => {
    event.preventDefault();

    // check if user entered a name, then make api call and instantiate player1 object in firebase
    if (this.state.playerName !== "") {
      this.getData().then(result => {
        this.setState({game: result.data});

        const defaultProfile = {
          gameID: this.state.game.deck_id,
          userName: this.state.playerName,
          status: "pending",
        }

        firebase.database().ref(`/player1`).set(defaultProfile)

        Swal.fire({
          icon: 'success',
          title: 'The Blackjack table will open momentarily',
          html: `Please send your friend the game ID: <b>${this.state.game.deck_id}</b>`,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        })
      })
      .catch(error => {console.log("axios error", error)})
    } else {
      this.nameCheck();
    };
  };
  // ========================================================


  // JOIN GAME===============================================
    // user wants to join an existing game
  handleClick = (event) => {
    // check if user entered a name
    if (this.state.playerName !== "") {
      
    } else {
      this.nameCheck();
    };
  };
  // ========================================================
    
  
  


  // RENDER==================================================
  render() {
    console.log("this.state.game in render", this.state.game)
    return (
      <div className="App">
        <h1>Blackjack Buddies</h1>

        {/* <h2>gameID: {this.state.game.deck_id}</h2>
        <h3>cards remaining: {this.state.game.remaining}</h3>
        <h3>shuffled: {String(this.state.game.shuffled)}</h3> */}
        
        <fieldset>
          <legend>Enter your player name</legend>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="playerName" value={this.state.playerNameInput} onChange={this.handleChangePlayerName}/>
            <button type="submit" value="newGame">new game</button>
            <button type="button" value="joinAGame" onClick={this.handleClick}>join a game</button>
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

  };
};
// =========================================================


// EXPORT DEFAULT===========================================
export default App;
// =========================================================
