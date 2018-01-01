import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './actions.js';
import { socket, isConnected, initialize } from './socket.js';
import Loader from '../Loader/Loader.jsx';

class Websocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    initialize(this.props.actions);
    socket.on('connect', this.onConnected);
    socket.on('disconnect', this.onDisconnected);
  }

  componentWillUnmount() {
    socket.off('connect', this.onConnected);
    socket.off('disconnect', this.onDisconnected);
  }

  onConnected = () => {
    this.setState({
      loading: !isConnected
    });
  }

  onDisconnected = () => {
    this.setState({
      loading: !isConnected
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loader visible={true}>Connexion...</Loader>);
    }
    return null;
  }
}

export default connect(
  () => ({}), 
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Websocket);