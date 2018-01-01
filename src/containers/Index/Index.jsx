import React, { Component } from 'react';
import Layout from '../Layout/DefaultLayout.jsx';
import StatusBar from '../../components/StatusBar/StatusBar.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../components/Websocket/actions.js';
import { 
  setPairable, 
  connectDevice,
  disconnectDevice,
  removeDevice
} from '../../components/Websocket/socket.js';
import { Link, LogIn, LogOut, Trash2 } from 'react-feather';
import Loader from '../../components/Loader/Loader.jsx';

import './Index.scss';

class Index extends Component {
  render() {
    const adapter = Object.values(this.props.adapters)[0] || null;
    const devices = Object.values(this.props.devices);

    const connectedDevice = devices.filter(device => device.Connected)[0] || null;

    if (!adapter) {
      return (<div>Aucun dongle wifi connecté</div>);
    }

    return (
      <Layout>
        <StatusBar device={connectedDevice} isPairable={adapter.Pairable} pair={() => setPairable(adapter.path)} />
        {devices.map((device) => (
          <div key={device.path} className="device-item">
            <div className="container">
              <div className="device-name">
                {device.Name || 'No name'} 
                {device.Connected && <Link className="icon" />}
              </div>
              <div className="device-addr">
                {device.Address}
              </div>
              <div className="actions">
                {!device.Connected &&
                  <button 
                    onClick={() => connectDevice(device.path)} 
                    type="button"
                    disabled={device.Connecting} 
                    className="btn btn-outline-primary">
                    <LogIn className="icon" />
                    Connect
                    <Loader className="btn-loader" size="xs" fill={false} visible={device.Connecting} />
                  </button>  
                }
                {device.Connected && 
                  <button 
                    onClick={() => disconnectDevice(device.path)} 
                    type="button" 
                    className="btn btn-outline-danger">
                    <LogOut className="icon" />
                    Disconnect
                  </button>
                }
                <button 
                  onClick={() => removeDevice(device.path)} 
                  type="button" 
                  className="btn btn-outline-shy">
                  <Trash2 className="icon" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </Layout>
    ) 
  }
}

export default connect(
  (state) => ({ 
    devices: state.ws.devices,
    adapters: state.ws.adapters
  }), 
  (dispatch) => bindActionCreators(actions, dispatch)
)(Index);