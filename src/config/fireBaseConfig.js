import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBRmljt36D5uvIzf6DiD0DOGZkOfRRSYio",
  authDomain: "todolist-2ecb2.firebaseapp.com",
  databaseURL: "https://todolist-2ecb2.firebaseio.com",
  projectId: "todolist-2ecb2",
  storageBucket: "",
  messagingSenderId: "201304819007",
  appId: "1:201304819007:web:357a8ed00b20ff57"
};

export const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
export let dbCollection = db.collection('users');

export const logOut = (login) => firebase.auth().signOut()

export const getData = ({userCollection, saveNewList}) => {
  userCollection.onSnapshot(docSnapshot => {
    const tempList = docSnapshot.docs.map(item => {
      return {...item.data(), id: item.id};
    });
    saveNewList({list: tempList});
  }, err => {
      console.log(`Encountered error: ${err}`);
    });
};

export const userAuthentication = ({uid, setUid, setLogin}) => {
  firebase.auth().onAuthStateChanged(user => {
    if(uid === ""){
      setUid(user.uid);
      setLogin(!!user)
    }
  })
}


export default firebase;

