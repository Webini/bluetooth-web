import React from 'react';
import { Bluetooth } from 'react-feather';

import './Header.scss';

export default function(props) {
  return (
    <div className="container">
      <div className="header d-flex align-items-center">
        <Bluetooth size="45" className="logo" /> BlueManager
      </div>
    </div>
  );
};