import React, { Component } from 'react';
import { auth, googleAuthProvider } from './firebase';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      });
    });
  }
  render() {
    if (!this.state.currentUser) {
      return (
        <button
          className="btn waves-effect waves-light"
          onClick={() => {
            auth.signInWithPopup(googleAuthProvider);
          }}
        >
          nalog{' '}
        </button>
      );
    }
    return (
      <button
        className="btn-floating btn-large waves-effect waves-light"
        onClick={() => {
          auth.signOut();
        }}
      >
        <i className="material-icons right">person_pin</i>
      </button>
    );
  }
}

export default Account;
