import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar, showSnack } from 'react-redux-snackbar';
import MainNav from './components/Navbar';

class App extends Component {
  getChildContext() {
    return {
      notify: (id, notifyText, customTimeout) => this.props.dispatch(showSnack(id, {
        label: notifyText,
        timeout: customTimeout || 5000,
        button: { label: 'x' },
      })),
    };
  }

  render() {
    return (
      <div className="App">
        <MainNav />
        <br />
        <br />
        <Snackbar />
      </div>
    );
  }
}

App.childContextTypes = { notify: PropTypes.func }

// Function to map the redux state to object properties
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(App);
