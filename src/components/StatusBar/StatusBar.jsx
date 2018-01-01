import React from 'react';
import PropTypes from 'prop-types';

import './StatusBar.scss';
import { Link } from 'react-feather';
import DeviceIcon from '../DeviceIcon/DeviceIcon.jsx';

const StatusBar = function(props) {
  return (
    <div className="status-bar d-flex align-items-center">
      <div className="container">
        <div className="content d-flex flex-wrap">
          {props.device && 
            <div className="device d-none d-sm-flex align-items-center">
              <span className="connected">Connected to</span>&nbsp;
              <span className="device-name">{props.device.Alias || props.device.Name}</span>
              <DeviceIcon className="device-icon" icon={props.device.Icon} />
            </div>
          }
          <div className="pairing-ctrl mx-auto mr-sm-0">
          {(props.isPairable
            ? <div className="is-pairable">The adapter is pairable</div>  
            : <button onClick={props.pair} type="button" className="isnt-pairable btn btn-white btn-shadow">
                <Link /> Allow pairing
              </button>
          )}
          </div>
        </div>
      </div>
    </div>
  )
};

StatusBar.propTypes = {
  device: PropTypes.object,
  pair: PropTypes.func.isRequired,
  isPairable: PropTypes.bool.isRequired
};

StatusBar.defaultProps = {
  device: null
};

export default StatusBar;