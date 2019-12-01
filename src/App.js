import React, { Component } from 'react';
import firebase from "./firebase.js";
import { Animated } from "react-animated-css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "axios";
import StartScreen from "./StartScreen.js";
import JoinGame from "./JoinGame.js";
import WaitingForPlayer from "./WaitingForPlayer.js";
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

      // if ("player2" in database) {
        
      // }
    })
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
  // =====================================================



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
        joinGameScreen: false,
        waitingForPlayerScreen: true
      })

      })
      .catch(error => { console.log("axios error", error) })
    
    
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
    }



    
  }


  // RENDER==================================================
  render() {
    console.log("this.state.game in render", this.state.game)
    return (
      <div className="App">
        {/* <h1>Blackjack Buddies</h1>
        
        <fieldset>
          <legend>Enter your player name</legend>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="playerName" value={this.state.playerNameInput} onChange={this.handleChangePlayerName}/>
            <button type="submit" value="newGame">new game</button>
            <button type="button" value="joinAGame" onClick={this.handleClick}>join a game</button>
          </form>
        </fieldset> */}
        
        {/* <StartScreen submit={this.handleSubmit} change={this.handleChangePlayerName} click={this.handleClick} /> */}



        
          {this.state.startScreen && <StartScreen submit={this.handleSubmitNewGame} change={this.handleChangePlayerName} click={this.handleClick} />}

          {this.state.joinGameScreen && <JoinGame submit={this.handleSubmitJoinGame} change={this.handleChangeGameID}/>}
        
          {this.state.waitingForPlayerScreen && <WaitingForPlayer />}
      </div>
    );

  };
};
// =========================================================


// EXPORT DEFAULT===========================================
export default App;
// =========================================================
