(this["webpackJsonpblackjack-app"]=this["webpackJsonpblackjack-app"]||[]).push([[0],{13:function(e,a,t){e.exports=t.p+"static/media/welcomeScreenImage.6e11f215.png"},135:function(e,a,t){},137:function(e,a,t){"use strict";t.r(a);var r=t(0),s=t.n(r),n=t(17),l=t.n(n),c=(t(55),t(23)),i=t.n(c),d=t(47),o=t(49),p=t(3),m=t(4),u=t(6),h=t(5),g=t(7),y=t(24),f=t.n(y);t(57);f.a.initializeApp({apiKey:"AIzaSyAkUgykm58rpozMvbKEcvg7cu90fLfo1Qs",authDomain:"blackjack-app-28b80.firebaseapp.com",databaseURL:"https://blackjack-app-28b80.firebaseio.com",projectId:"blackjack-app-28b80",storageBucket:"blackjack-app-28b80.appspot.com",messagingSenderId:"156419063806",appId:"1:156419063806:web:cd623fbd72f2274b968aaf"});var b=f.a,k=(t(59),t(10)),v=t.n(k),C=(t(114),t(18),t(117),t(48)),E=t.n(C),I=function(e){var a=e.submit,r=e.change,n=e.click;return s.a.createElement("div",{className:"wrapper"},s.a.createElement("h1",null,"Blackjack Buddies"),s.a.createElement("img",{src:t(13),alt:"Ace of spades and jack of spades playing cards",className:"logoImage"}),s.a.createElement("div",{className:"instructions"},s.a.createElement("h3",null,"Welcome to Blackjack Buddies"),s.a.createElement("p",null,"To begin a game, please enter your name in the form below and click the ",s.a.createElement("span",null,"new game")," button"),s.a.createElement("p",null,"Looking to join a friend's game? Simply enter your name in the form and click the ",s.a.createElement("span",null,"join a game")," button")),s.a.createElement("div",{className:"fieldset"},s.a.createElement("fieldset",null,s.a.createElement("legend",null,"Enter your player name"),s.a.createElement("form",{onSubmit:a,className:"nameForm"},s.a.createElement("input",{type:"text",id:"playerName",onChange:r,placeholder:"Type a player name here"}),s.a.createElement("button",{type:"submit",value:"newGame",className:"button"},"new game"),s.a.createElement("button",{type:"button",value:"joinAGame",onClick:n,className:"button"},"join a game")))))},j=function(e){var a=e.submit,r=e.change;return s.a.createElement("div",{className:"wrapper"},s.a.createElement("h1",null,"Blackjack Buddies"),s.a.createElement("img",{src:t(13),alt:"Ace of spades and jack of spades playing cards",className:"logoImage"}),s.a.createElement("div",{className:"instructions"},s.a.createElement("h3",null,"Blackjack Buddies - Join a Game"),s.a.createElement("p",null,"Please enter the game ID in the form and click the ",s.a.createElement("span",null,"join game")," button")),s.a.createElement("div",{className:"fieldset"},s.a.createElement("fieldset",null,s.a.createElement("legend",null,"Enter the game ID"),s.a.createElement("form",{onSubmit:a,className:"joinForm"},s.a.createElement("input",{type:"text",id:"gameID",onChange:r,placeholder:"Please enter game ID"}),s.a.createElement("button",{type:"submit",value:"joinGame",className:"button"},"join game")))))},N=function(){return s.a.createElement("div",{className:"wrapper"},s.a.createElement("h1",null,"Blackjack Buddies"),s.a.createElement("img",{src:t(13),alt:"Ace of spades and jack of spades playing cards",className:"logoImage"}),s.a.createElement("div",{className:"instructions"},s.a.createElement("h3",null,"Shuffling Deck"),s.a.createElement("p",null,"Waiting for other player")))},D=(r.Component,t(134),function(e){function a(){var e;return Object(p.a)(this,a),(e=Object(u.a)(this,Object(h.a)(a).call(this))).state={handValue:0},e}return Object(g.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.evaluateHand(this.props.cardValues);console.log("hand value",e),this.setState({handValue:e})}},{key:"render",value:function(){return s.a.createElement("div",{className:"cards"},s.a.createElement("div",{className:"card1"},s.a.createElement("img",{src:this.props.cardImages[0],alt:""})),s.a.createElement("div",{className:"card2"},s.a.createElement("img",{src:this.props.cardImages[1],alt:""})),s.a.createElement("div",{className:"value"},s.a.createElement("p",null,"Value: ",this.state.handValue)))}}]),a}(r.Component)),w=function(e){function a(){var e;return Object(p.a)(this,a),(e=Object(u.a)(this,Object(h.a)(a).call(this))).state={handValue:0},e}return Object(g.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.evaluateHand(this.props.cardValues);console.log("hand value",e),this.setState({handValue:e})}},{key:"render",value:function(){return s.a.createElement("div",{className:"cards"},s.a.createElement("div",{className:"card1"},s.a.createElement("img",{src:this.props.cardImages[0],alt:""})),s.a.createElement("div",{className:"card2"},s.a.createElement("img",{src:this.props.cardImages[1],alt:""})),s.a.createElement("div",{className:"value"},s.a.createElement("p",null,"Value: ",this.state.handValue)))}}]),a}(r.Component),S=function(e){function a(){var e;return Object(p.a)(this,a),(e=Object(u.a)(this,Object(h.a)(a).call(this))).state={playerNumber:""},e}return Object(g.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){'<img src="'.concat(this.props.player1CardImages.card1,'"/>'),'<img src="'.concat(this.props.player1CardImages.card2,'"/>');return this.props.playersReady&&this.props.player1&&!this.props.player1Cards?s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",null,s.a.createElement("h1",null,"Blackjack Buddies"),s.a.createElement("img",{src:t(13),alt:"Ace of spades and jack of spades playing cards",className:"logoImage"})),s.a.createElement("div",{className:"instructions"},s.a.createElement("h3",null,"As soon as you're feeling lucky hit the ",s.a.createElement("span",null,"deal")," button."),s.a.createElement("h3",null,"Not your time to shine? Hit the ",s.a.createElement("span",null,"end game")," button"),s.a.createElement("button",{onClick:this.props.clickDeal,className:"button"},"deal"),s.a.createElement("button",{onClick:this.props.endGame,className:"button"},"end game"))):this.props.playersReady&&this.props.player2&&!this.props.player2Cards?s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",null,s.a.createElement("h1",null,"Blackjack Buddies"),s.a.createElement("img",{src:t(13),alt:"Ace of spades and jack of spades playing cards",className:"logoImage"})),s.a.createElement("div",{className:"instructions"},s.a.createElement("h3",null,"Waiting for the dealer to deal the cards..."))):this.props.playersReady&&this.props.player1&&this.props.player1Cards&&this.props.player2Cards?this.props.player1HasImages?s.a.createElement("div",null,this.props.dealerCards?s.a.createElement(w,{cardValues:this.props.dealerCardValues,cardImages:this.props.dealerCardImages,evaluateHand:this.props.evaluateHand}):null,this.props.player1Cards?s.a.createElement(D,{cardValues:this.props.player1CardValues,cardImages:this.props.player1CardImages,evaluateHand:this.props.evaluateHand}):null,s.a.createElement("button",{onClick:this.props.endGame,className:"button"},"end game")):(this.props.cardImages("player1"),this.props.cardImages("dealer"),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.endGame},"end game"),s.a.createElement("h1",null,"images func is getting by..."))):this.props.playersReady&&this.props.player2&&this.props.player1Cards&&this.props.player2Cards?this.props.player2HasImages?s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.endGame},"end game"),s.a.createElement("h1",null,"have images")):(this.props.cardImages("player2"),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.endGame},"end game"),s.a.createElement("h1",null,"images func is also getting by here..."))):null}}]),a}(r.Component),A=(t(135),t(136),function(e){function a(){var e;return Object(p.a)(this,a),(e=Object(u.a)(this,Object(h.a)(a).call(this))).renderTrigger=function(){e.setState({blackjack:!0})},e.handleChangePlayerName=function(a){e.setState({playerName:a.target.value})},e.handleChangeGameID=function(a){e.setState({gameIDInput:a.target.value})},e.nameCheck=function(){v.a.fire({icon:"error",title:"Please enter a user name to begin",showClass:{popup:"animated fadeInDown faster"},hideClass:{popup:"animated fadeOutUp faster"}})},e.handleSubmitNewGame=function(a){if(a.preventDefault(),""!==e.state.playerName){e.getData("new","shuffle/?deck_count=1").then((function(a){e.setState({game:a.data});var t={gameID:e.state.game.deck_id,userName:e.state.playerName,status:"initialize",hand:["empty"]};b.database().ref("/player1").set(t);var r={gameID:e.state.game.deck_id,userName:"Dealer",status:"initialize",hand:["empty"]};b.database().ref("/dealer").set(r),v.a.fire({icon:"success",title:"The Blackjack table will open momentarily",html:"Please send your friend the game ID: <b>".concat(e.state.game.deck_id,"</b>"),showClass:{popup:"animated fadeInDown faster"},hideClass:{popup:"animated fadeOutUp faster"}}),e.setState({player1:!0,startScreen:!1,waitingForPlayerScreen:!0})})).catch((function(e){console.log("axios error",e)}))}else e.nameCheck()},e.handleClick=function(a){""!==e.state.playerName?e.setState({startScreen:!1,joinGameScreen:!0}):e.nameCheck()},e.handleSubmitJoinGame=function(a){if(a.preventDefault(),""!==e.state.gameIDInput){e.getData(e.state.gameIDInput,"shuffle/?deck_count=1").then((function(a){e.setState({game:a.data});var t={gameID:e.state.game.deck_id,userName:e.state.playerName,status:"initialize",hand:["empty"]};b.database().ref("/player2").set(t),v.a.fire({icon:"success",title:"The Blackjack table will open momentarily",showClass:{popup:"animated fadeInDown faster"},hideClass:{popup:"animated fadeOutUp faster"}}),e.setState({player2:!0,joinGameScreen:!1,waitingForPlayerScreen:!0})})).catch((function(e){console.log("axios error",e),v.a.fire({icon:"error",title:"There is no existing game matching that ID.",text:"Please check the ID and try again",footer:"".concat(e),showClass:{popup:"animated fadeInDown faster"},hideClass:{popup:"animated fadeOutUp faster"}})}))}else v.a.fire({icon:"error",title:"Please enter a game ID to begin",showClass:{popup:"animated fadeInDown faster"},hideClass:{popup:"animated fadeOutUp faster"}})},e.playersPresent=function(a){setTimeout((function(){if("player1"in a&&"player2"in a){e.setState({waitingForPlayerScreen:!1,playersPresent:!0,playersReady:!0});var t={status:"pending"};b.database().ref("/player1").update(t),b.database().ref("/player2").update(t)}}),2e3)},e.handleClickDeal=function(a){e.getData(e.state.game.deck_id,"draw/?count=2").then((function(a){console.log("deal p1 result",a);var t=a.data.cards[0].code,r=a.data.cards[1].code,s="pile/player1/add/?cards=".concat(t,",").concat(r);e.getData(e.state.game.deck_id,s).then((function(e){console.log("player 1 hand",t,r)}));var n={hand:[a.data.cards[0].image,a.data.cards[1].image]};b.database().ref("/player1").update(n),e.setState({player1Cards:!0,player1CardValues:[t,r]})}));e.getData(e.state.game.deck_id,"draw/?count=2").then((function(a){console.log("deal p2 result",a);var t=a.data.cards[0].code,r=a.data.cards[1].code,s="pile/player2/add/?cards=".concat(t,",").concat(r);e.getData(e.state.game.deck_id,s).then((function(e){console.log("player 2 hand",t,r)}));var n={hand:[a.data.cards[0].image,a.data.cards[1].image]};b.database().ref("/player2").update(n),e.setState({player2Cards:!0,player2CardValues:[t,r]})}));e.getData(e.state.game.deck_id,"draw/?count=2").then((function(a){console.log("deal dealer result",a);var t=a.data.cards[0].code,r=a.data.cards[1].code,s="pile/player1/add/?cards=".concat(t,",").concat(r);e.getData(e.state.game.deck_id,s).then((function(e){console.log("dealer hand",t,r)}));var n={hand:[a.data.cards[0].image,a.data.cards[1].image]};b.database().ref("/dealer").update(n);b.database().ref("/game").update({status:"in progress"}),e.setState({dealerCards:!0,dealerCardValues:[t,r]})}))},e.getCardImages=function(a){b.database().ref("/".concat(a,"/hand")).on("value",(function(t){console.log("firebase card image data",t.val()),"player1"===a?e.setState({player1CardImages:t.val(),player1HasImages:!0}):"player2"===a?e.setState({player2CardImages:t.val(),player2HasImages:!0}):"dealer"===a&&e.setState({dealerCardImages:t.val(),dealerHasImages:!0})}))},e.evalHand=function(e){var a=Object(o.a)(e).map((function(e){var a=Array.from(e);console.log("single card array",a);var t=parseInt(a[0]);console.log("parse value",t);return["A","J","Q","K"].includes(a[0])&&"A"!==a[0]?10:"A"===a[0]?[11,1]:0===t?10:t}));return(Array.isArray(a[0])||Array.isArray(a[1]))&&(Array.isArray(a[0])&&Array.isArray(a[1])?a[0]=1:Array.isArray(a[0])?11+a[1]>21?a[0]=1:a[0]=11:Array.isArray(a[1])&&(a[0]+11>21?a[1]=1:a[1]=11)),a[0]+a[1]},e.handleClickClose=function(e){b.database().ref().set({game:{status:"ready"}}),window.location.reload(!1)},e.state={blackjack:"",game:null,cardsDealt:!1,player1:!1,player2:!1,player1Cards:!1,player2Cards:!1,dealerCards:!1,player1CardValues:[],player2CardValues:[],dealerCardValues:[],player1CardImages:{},player2CardImages:{},dealerCardImages:{},player1HasImages:!1,player2HasImages:!1,dealerHasImages:!1,player1Ready:!1,player2Ready:!1,playersReady:!1,playerName:"",gameIDInput:"",playersPresent:!1,startScreen:!0,joinGameScreen:!1,waitingForPlayerScreen:!1},e}return Object(g.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;b.database().ref().on("value",(function(a){var t=a.val();console.log("database",t),e.state.playersPresent||e.playersPresent(t),e.state.cardsDealt||"in progress"!=t.game.status||e.setState({cardsDealt:!0}),e.renderTrigger()}))}},{key:"getData",value:function(){var e=Object(d.a)(i.a.mark((function e(a,t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E()({url:"https://deckofcardsapi.com/api/deck/".concat(a,"/").concat(t),method:"GET",dataResponse:"json"});case 2:return r=e.sent,e.next=5,r;case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},this.state.startScreen&&s.a.createElement(I,{submit:this.handleSubmitNewGame,change:this.handleChangePlayerName,click:this.handleClick}),this.state.joinGameScreen&&s.a.createElement(j,{submit:this.handleSubmitJoinGame,change:this.handleChangeGameID}),this.state.waitingForPlayerScreen&&s.a.createElement(N,{gameID:this.state.game.deck_id}),this.state.playersPresent&&s.a.createElement(S,{player1:this.state.player1,player2:this.state.player2,playersReady:this.state.playersReady,click:this.handleClickReady,clickDeal:this.handleClickDeal,player1Cards:this.state.player1Cards,player2Cards:this.state.player2Cards,dealerCards:this.state.dealerCards,player1CardValues:this.state.player1CardValues,player2CardValues:this.state.player2CardValues,dealerCardValues:this.state.dealerCardValues,cardImages:this.getCardImages,player1CardImages:this.state.player1CardImages,player2CardImages:this.state.player2CardImages,dealerCardImages:this.state.dealerCardImages,player1HasImages:this.state.player1HasImages,player2HasImages:this.state.player2HasImages,dealerHasImages:this.state.dealerHasImages,evaluateHand:this.evalHand,endGame:this.handleClickClose}))}}]),a}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},50:function(e,a,t){e.exports=t(137)},55:function(e,a,t){}},[[50,1,2]]]);
//# sourceMappingURL=main.4968fe8e.chunk.js.map