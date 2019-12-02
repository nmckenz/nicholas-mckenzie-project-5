import React, { Component } from 'react';
import firebase from "./firebase.js";
import { Animated } from "react-animated-css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "axios";
import StartScreen from "./StartScreen.js";
import JoinGame from "./JoinGame.js";
import WaitingForPlayer from "./WaitingForPlayer.js";
import GameTable from "./GameTable.js"
import './App.css';
import { readSync } from 'fs';



class App extends Component {
  constructor() {
    super();
    this.state = {
      blackjack: [],
      game: null,
      player1: false,
      player2: false,
      playerName: "",
      gameIDInput: "",
      playersReady: false,
      startScreen: true,
      joinGameScreen: false,
      waitingForPlayerScreen: false,
    };
  };



  componentDidMount() {
    // FIREBASE======================================
    const dbRef = firebase.database().ref();

    dbRef.on("value", (snapshot) => {
      const database = snapshot.val()
      console.log("database snapshot", snapshot)
      console.log("database on change", database)

      this.playersReady(database);
    });
    // ==============================================
  };

  
  
  // AXIOS==============================================
    // call api for new deck on game start--------------
  async getData(deck) {
    const result = await axios({
      url: `https://deckofcardsapi.com/api/deck/${deck}/shuffle/?deck_count=1`,
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
  // ======================================================
  
  

  // GAME ID==============================================
    // read user input for game id and save to state
  handleChangeGameID = (event) => {
    this.setState({
      gameIDInput: event.target.value
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
  // ========================================================
  
  
  // NEW GAME================================================
    // user wants to start new game---------------------------
  handleSubmitNewGame = (event) => {
    event.preventDefault();
    
    // check if user entered a name, then make api call and instantiate player1 object in firebase
    if (this.state.playerName !== "") {
      this.getData("new").then(result => {
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
        
        this.setState({
          player1: true,
          startScreen: false,
          waitingForPlayerScreen: true
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
      this.setState({
        startScreen: false,
        joinGameScreen: true
      });
    } else {
      this.nameCheck();
    };
  };
  // ========================================================
    
  
  
  // JOIN A GAME=============================================
    // user has entered an existing game ID and wants to join game
  handleSubmitJoinGame = (event) => {
    event.preventDefault();
    
    if (this.state.gameIDInput !== "") {
      this.getData(this.state.gameIDInput).then(result => {
        this.setState({ game: result.data });

        const defaultProfile = {
          gameID: this.state.game.deck_id,
        userName: this.state.playerName,
        status: "pending",
      };
      
      firebase.database().ref(`/player2`).set(defaultProfile);
      
      Swal.fire({
        icon: 'success',
        title: 'The Blackjack table will open momentarily',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });
      
      this.setState({
        player2: true,
        joinGameScreen: false,
        waitingForPlayerScreen: true
      })
      
      })
      .catch((error) => {
        console.log("axios error", error)

        Swal.fire({
          icon: 'error',
          title: 'There is no existing game matching that ID.',
          text: 'Please check the ID and try again',
          footer: `${error}`,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        });
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please enter a game ID to begin',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });
    };
  };
  // ========================================================



  // PLAYERS READY===========================================
    // check if both players ready, if so render game table
  playersReady = (database) => {
    setTimeout(() => {
      if ("player1" in database) {
        if ("player2" in database) {
          this.setState({
            waitingForPlayerScreen: false,
            playersReady: true
          });
          console.log("ready to BEGIN");
        };
      };
    }, 2000);
  };
  // ========================================================


  
  // RENDER==================================================
  render() {
    return (
      <div className="App">
          {this.state.startScreen && <StartScreen submit={this.handleSubmitNewGame} change={this.handleChangePlayerName} click={this.handleClick} />}

          {this.state.joinGameScreen && <JoinGame submit={this.handleSubmitJoinGame} change={this.handleChangeGameID}/>}
        
          {this.state.waitingForPlayerScreen && <WaitingForPlayer />}

          {this.state.playersReady && <GameTable />}
      </div>
    );
  };
};
// =========================================================



// EXPORT DEFAULT===========================================
export default App;
// =========================================================
