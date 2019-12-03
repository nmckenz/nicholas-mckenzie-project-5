import React, { Component } from 'react';
import firebase from "./firebase.js";
import { Animated } from "react-animated-css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import StartScreen from "./StartScreen.js";
import JoinGame from "./JoinGame.js";
import WaitingForPlayer from "./WaitingForPlayer.js";
import WaitingForCards from "./WaitingForCards.js"
import GameTable from "./GameTable.js"
import './App.css';
import { readSync } from 'fs';


  // < i class="far fa-window-close" ></i >



class App extends Component {
  constructor() {
    super();
    this.state = {
      blackjack: "",
      game: null,
      player1: false,
      player2: false,
      player1Cards: false,
      player2Cards: false,
      dealerCards: false,
      player1CardValues: [],
      player2CardValues: [],
      dealerCardValues: [],
      player1CardImages: {},
      player2CardImages: {},
      dealerCardImages: {},
      player1HasImages: false,
      player2HasImages: false,
      dealerHasImages: false,
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
      // console.log("database snapshot", snapshot)
      // console.log("database on change", database)

      // console.log("state players present", this.state.playersPresent)
      if (!this.state.playersPresent) {
        this.playersPresent(database);
      } 
      // this.playersReady(database);
      this.renderTrigger()
    });
    // ==============================================
    
  };
  // library.add(faWindowClose)
  
  renderTrigger = () => {
    this.setState({
      blackjack: true
    })
  }
  
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
          hand: ["empty"]
        }

        firebase.database().ref(`/player1`).set(defaultProfile)

        const defaultDealerProfile = {
          gameID: this.state.game.deck_id,
          userName: "Dealer",
          status: "initialize",
          hand: ["empty"]
        }

        firebase.database().ref(`/dealer`).set(defaultDealerProfile)
        
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
          hand: ["empty"]
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
      console.log("deal p1 result", result)

      const card1 = result.data.cards[0].code;
      const card2 = result.data.cards[1].code;
      const takePlayer1Cards = `pile/player1/add/?cards=${card1},${card2}`;
      this.getData(this.state.game.deck_id, takePlayer1Cards).then((result) => {
        console.log("player 1 hand", card1, card2)
      })
      
      const card1image = result.data.cards[0].image
      const card2image = result.data.cards[1].image
      const player1hand = { hand: [card1image, card2image] }
      firebase.database().ref('/player1').update(player1hand)

      this.setState({
        player1Cards: true,
        player1CardValues: [card1, card2]
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

      const card1image = result.data.cards[0].image
      const card2image = result.data.cards[1].image
      const player2hand = { hand: [card1image, card2image] }
      firebase.database().ref('/player2').update(player2hand)

      this.setState({
        player2Cards: true,
        player2CardValues: [card1, card2]
      })

      // if (this.state.player1cards && this.state.player2cards) {
      //   console.log("players have cards")
      //   this.setState({
      //     playersHaveCards: true
      //   })
      // }
    })

    const dealDealerCards = "draw/?count=2";
    this.getData(this.state.game.deck_id, dealDealerCards).then((result) => {
      console.log("deal dealer result", result)

      const card1 = result.data.cards[0].code;
      const card2 = result.data.cards[1].code;
      const takeDealerCards = `pile/player1/add/?cards=${card1},${card2}`;
      this.getData(this.state.game.deck_id, takeDealerCards).then((result) => {
        console.log("dealer hand", card1, card2)
      })

      const card1image = result.data.cards[0].image
      const card2image = result.data.cards[1].image
      const dealerHand = { hand: [card1image, card2image] }
      firebase.database().ref('/dealer').update(dealerHand)

      this.setState({
        dealerCards: true,
        dealerCardValues: [card1, card2]
      })
    })
  }
  // ========================================================
  


  // GET CARD IMAGES=========================================
  getCardImages = (player) => {
    // console.log("concat test", `/${player}/hand`)
    const cardImagesObject = firebase.database().ref(`/${player}/hand`).on("value", data => {
      console.log("firebase card image data", data.val())
      if (player === "player1") {
        this.setState({
          player1CardImages: data.val(),
          player1HasImages: true
        })
      } else if (player === "player2") {
        this.setState({
          player2CardImages: data.val(),
          player2HasImages: true
        })
      } else if (player === "dealer") {
        this.setState({
          dealerCardImages: data.val(),
          dealerHasImages: true
        })
      }
    })
  }
  // ========================================================


  // HAND VALUATION==========================================
  evalHand = (handArray) => {
    const oldArray = [...handArray];
    let valueArray = oldArray.map((card) => {
      const singleCardArray = Array.from(card)
      console.log("single card array", singleCardArray)
      const parseValue = parseInt(singleCardArray[0])
      console.log("parse value", parseValue)
      const faceCardsArray = ["A", "J", "Q", "K"]
      if (faceCardsArray.includes(singleCardArray[0]) && singleCardArray[0] !== "A") {
        return 10;
      } else if (singleCardArray[0] === "A") {
        return [11, 1]
      } else {
        if (parseValue === 0) {
          return 10;
        } else {
          return parseValue;
        }
      }
    })
    console.log("value array", valueArray)

    if (Array.isArray(valueArray[0]) || Array.isArray(valueArray[1])) {
      console.log("Array.isArray -1", valueArray[0], valueArray[1])
      if (Array.isArray(valueArray[0])) {
        if ((11 + valueArray[1]) > 21) {
          valueArray[0] = 1
        }
      } else if (Array.isArray(valueArray[1])) {
        if ((valueArray[0] + 11) > 21) {
          valueArray[1] = 1
        }
      }
    }

    const handValue = valueArray[0] + valueArray[1];
    return handValue;
  }
  // ========================================================


  // END GAME================================================
  handleClickClose = (event) => {
    const defaultFirebase = {
      game: {
        status: "ready"
      }
    }
    firebase.database().ref().set(defaultFirebase)
    window.location.reload(false);
  }
  // ========================================================



  // RENDER==================================================
  render() {
    return (
      <div className="App">
          {this.state.startScreen && <StartScreen submit={this.handleSubmitNewGame} change={this.handleChangePlayerName} click={this.handleClick} />}

          {this.state.joinGameScreen && <JoinGame submit={this.handleSubmitJoinGame} change={this.handleChangeGameID}/>}
        
          {this.state.waitingForPlayerScreen && <WaitingForPlayer />}

          {/* {this.state.playersPresent && <WaitingForCards player1={this.state.player1} />} */}

        {/* {console.log("players present in render", this.state.playersPresent)} */}

          {this.state.playersPresent && <GameTable 
          player1={this.state.player1} 
          player2={this.state.player2} 
          playersReady={this.state.playersReady} 
          click={this.handleClickReady} 
          clickDeal={this.handleClickDeal} 
          player1Cards={this.state.player1Cards} 
          player2Cards={this.state.player2Cards}
          dealerCards={this.state.dealerCards}
          player1CardValues={this.state.player1CardValues}
          player2CardValues={this.state.player2CardValues}
          dealerCardValues={this.state.dealerCardValues}
          cardImages={this.getCardImages}
          player1CardImages={this.state.player1CardImages}
          player2CardImages={this.state.player2CardImages}
          dealerCardImages={this.state.dealerCardImages}
          player1HasImages={this.state.player1HasImages}
          player2HasImages={this.state.player2HasImages}
          dealerHasImages={this.state.dealerHasImages}
          evaluateHand={this.evalHand}
          endGame={this.handleClickClose}
          />}

      </div>
    );
  };
};
// =========================================================



// EXPORT DEFAULT===========================================
export default App;
// =========================================================
