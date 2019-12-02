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
      player1Ready: false,
      player2Ready: false,
      playersReady: false,
      playerName: "",
      gameIDInput: "",
      playersPresent: false,
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

      this.playersPresent(database);
      // this.playersReady(database);
    });
    // ==============================================
  };

  
  
  // AXIOS==============================================
    // call api for new deck on game start--------------
  async getData(deck, action) {
    const result = await axios({
      url: `https://deckofcardsapi.com/api/deck/${deck}/${action}`,
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
      const action = "shuffle/?deck_count=1";
      this.getData("new", action).then(result => {
        this.setState({game: result.data});

        const defaultProfile = {
          gameID: this.state.game.deck_id,
          userName: this.state.playerName,
          status: "initialize",
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
      const action = "shuffle/?deck_count=1";
      this.getData(this.state.gameIDInput, action).then(result => {
        this.setState({ game: result.data });

        const defaultProfile = {
          gameID: this.state.game.deck_id,
          userName: this.state.playerName,
          status: "initialize",
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



  // PLAYERS PRESENT===========================================
    // check if both players present, if so render game table
  playersPresent = (database) => {
    setTimeout(() => {

      // NOTE Players Ready section fails on initial load because player1, player2 objects have not yet been created in firebase. To fix this issue, I start firebase with default player1 and player2 objects. In doing so, this broke Players Present section because the if-in statements are immediately true from initial load

      if ("player1" in database) {
        if ("player2" in database) {
          this.setState({
            waitingForPlayerScreen: false,
            playersPresent: true,
            playersReady: true
          });
          console.log("ready to BEGIN");

          //these are to deal with the issue NOTED above and below
          const ready = { status: "pending" };
          firebase.database().ref('/player1').update(ready)
          firebase.database().ref('/player2').update(ready)

        };
      };


      // NOTE to deal with the above, I refactored Players Present check to look for a change in firebase player object status key. Now, I am getting a "maximum update depth exceeded" error. React does not like the repeated setState calls from componentDidMount?
      // SOLUTION? Perhaps I could further refactor the code to remove the ready button on game table load. Can I just assume that players are immediately ready to receive cards? If so, I could update firebase to player object status pending inside Players Present section.

      // if (database.player1.status === "initialize" && database.player2.status === "initialize") {
      //   this.setState({
      //     waitingForPlayerScreen: false,
      //     playersPresent: true
      //   });
      //   console.log("ready to BEGIN");
      // };
    }, 2000);
  };
  // ========================================================



  // PLAYERS READY===========================================
    //check if both players ready, if so allow player 1 to deal
  // handleClickReady = (event, player) => {
  //   const ready = {status: "pending"};
  //   const dbRef = firebase.database().ref(player);
  //   dbRef.update(ready);
  // }

  // playersReady = (database) => {
  //   setTimeout(() => {
  //     if (database.player1.status === "pending" && database.player2.status === "pending") {
  //       this.setState({
  //         playersReady: true
  //       })
  //     }
  //     // if (database.player1.status === "pending") {
  //     //   this.setState({
  //     //     player1Ready: true
  //     //   })
  //     // }
  //   }, 2000);
  // };
  // ========================================================



  // DEAL THE CARDS==========================================
  handleClickDeal = (event) => {
    // https://deckofcardsapi.com/api/deck/sbx4a2fp31m4/draw/?count=2

    const dealPlayer1Cards = "draw/?count=2";
    this.getData(this.state.game.deck_id, dealPlayer1Cards).then((result) => {
      // https://deckofcardsapi.com/api/deck/sbx4a2fp31m4/pile/hand2/add/?cards=JS,6H

      console.log("deal p1 result", result)
      const card1 = result.data.cards[0].code;
      const card2 = result.data.cards[1].code;
      const takePlayer1Cards = `pile/player1/add/?cards=${card1},${card2}`;
      this.getData(this.state.game.deck_id, takePlayer1Cards).then((result) => {
        console.log("player 1 hand", card1, card2)
      })
    })

    const dealPlayer2Cards = "draw/?count=2";
    this.getData(this.state.game.deck_id, dealPlayer2Cards).then((result) => {

      console.log("deal p2 result", result)
      const card1 = result.data.cards[0].code;
      const card2 = result.data.cards[1].code;
      const takePlayer2Cards = `pile/player2/add/?cards=${card1},${card2}`;
      this.getData(this.state.game.deck_id, takePlayer2Cards).then((result) => {
        console.log("player 2 hand", card1, card2)
      })
    })
  }
  // ========================================================
  


  // RENDER==================================================
  render() {
    return (
      <div className="App">
          {this.state.startScreen && <StartScreen submit={this.handleSubmitNewGame} change={this.handleChangePlayerName} click={this.handleClick} />}

          {this.state.joinGameScreen && <JoinGame submit={this.handleSubmitJoinGame} change={this.handleChangeGameID}/>}
        
          {this.state.waitingForPlayerScreen && <WaitingForPlayer />}

          {this.state.playersPresent && <GameTable player1={this.state.player1} player2={this.state.player2} playersReady={this.state.playersReady} click={this.handleClickReady} clickDeal={this.handleClickDeal} />}
      </div>
    );
  };
};
// =========================================================



// EXPORT DEFAULT===========================================
export default App;
// =========================================================
