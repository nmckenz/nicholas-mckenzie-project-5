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
    // axios({
    //   url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
    //   method: `GET`,
    //   dataResponse: `json`
    // }).then((result) => {
    //   console.log("cards api result", result)
    //   this.setState({
    //     // game.gameID: result.data.deck_id
    //     // game.cardsRemaining: result.data.remaining
    //     // game.shuffled: result.data.shuffled
    //     game: result.data

    //   })
    // })
    // ==============================================

    const MySwal = withReactContent(Swal)

    // MySwal.fire({
    //   // title: <p>Hello World</p>,
    //   // footer: 'Copyright 2018',
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Something went wrong!',
    //   footer: '<a href>Why do I have this issue?</a>',
    //   onOpen: () => {
    //     // `MySwal` is a subclass of `Swal`
    //     //   with all the same instance & static methods
    //     MySwal.clickConfirm()
    //   }
    // }).then(() => {
    //   return MySwal.fire()
    // })

    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Something went wrong!',
    //   footer: '<a href>Why do I have this issue?</a>'
    // })

  }



  // AXIOS==============================================
    // call api for new deck on game start--------------
  async getData() {
    const result = await axios({
      url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
      method: `GET`,
      dataResponse: `json`
    });
    return await result
  }
  // ====================================================



  // PLAYER NAME==========================================
    // read user input for name and save to state--------
  handleChange = (event) => {
    this.setState({
      playerName: event.target.value
    });
  }
  // ========================================================


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
      })
      .catch(error => {console.log("axios error", error)})
    } else {
      // alert("Please enter a user name to begin");
      Swal.fire({
        icon: 'error',
        title: 'Please enter a user name to begin',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      })
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
            <input type="text" id="playerName" value={this.state.playerNameInput} onChange={this.handleChange}/>
            <button type="submit" value="newGame">new game</button>
            <button type="button" value="joinGame">join a game</button>
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
