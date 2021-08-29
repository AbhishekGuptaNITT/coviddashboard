import React,{ Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/layout'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


class App extends Component{
  state={
    loggedIn:null,
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  firebaseConfig = {
    apiKey: "AIzaSyBbaUqBkLIuH_8E6jUk8hWd3D5ft9dFIJ4",
    authDomain: "evernote-clone-10281.firebaseapp.com",
    projectId: "evernote-clone-10281",
    storageBucket: "evernote-clone-10281.appspot.com",
    messagingSenderId: "706036736287",
    appId: "1:706036736287:web:968c0114d2c94192be902a",
    measurementId: "G-VLKKBP5ZM0"
};
  constructor(){
    super()
    if (firebase.apps.length === 0) {
      firebase.initializeApp(this.firebaseConfig);
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loggedIn:user
      })
    })
  }
  render(){
    const ui = (
      <StyledFirebaseAuth 
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
      />
    )
    let elem = null,msg=null;
    if(this.state.loggedIn){
      elem = <Layout user={this.state.loggedIn} />
    }
    else{
      msg=<div style={{textAlign:'center',color:'grey',margin:'20px'}}>please login to continue</div>
      elem = ui;
    }
    return(
      <BrowserRouter>
      <div>
        {msg}
        {elem}
      </div>
      </BrowserRouter>
    )
  }
}

export default App