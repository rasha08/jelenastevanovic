import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyC_Mba3-WKoP0XHz-XjCNDf3yc8FIiUa7g',
  authDomain: 'jelenastevanovic-cd802.firebaseapp.com',
  databaseURL: 'https://jelenastevanovic-cd802.firebaseio.com',
  projectId: 'jelenastevanovic-cd802',
  storageBucket: 'jelenastevanovic-cd802.appspot.com',
  messagingSenderId: '300544889679'
};
firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
export const auth = firebase.auth();
// export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
