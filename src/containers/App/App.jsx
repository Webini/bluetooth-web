import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config'
import Websocket from '../../components/Websocket/Websocket.jsx';

class App extends Component {
  render() {
    return (
      <div className="app">
        {renderRoutes(this.props.route.routes)}
        <Websocket />
      </div>
    );
  }
}

export default App;
