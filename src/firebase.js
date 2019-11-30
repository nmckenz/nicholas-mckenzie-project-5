import firebase from "firebase/app"
import "firebase/database"

// < !--The core Firebase JS SDK is always required and must be listed first-- >
//     <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>

//     <!--TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//     // Your web app's Firebase configuration
//     var firebaseConfig = {
//         apiKey: "AIzaSyAkUgykm58rpozMvbKEcvg7cu90fLfo1Qs",
//     authDomain: "blackjack-app-28b80.firebaseapp.com",
//     databaseURL: "https://blackjack-app-28b80.firebaseio.com",
//     projectId: "blackjack-app-28b80",
//     storageBucket: "blackjack-app-28b80.appspot.com",
//     messagingSenderId: "156419063806",
//     appId: "1:156419063806:web:cd623fbd72f2274b968aaf"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>

const firebaseConfig = {
    apiKey: "AIzaSyAkUgykm58rpozMvbKEcvg7cu90fLfo1Qs",
    authDomain: "blackjack-app-28b80.firebaseapp.com",
    databaseURL: "https://blackjack-app-28b80.firebaseio.com",
    projectId: "blackjack-app-28b80",
    storageBucket: "blackjack-app-28b80.appspot.com",
    messagingSenderId: "156419063806",
    appId: "1:156419063806:web:cd623fbd72f2274b968aaf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;