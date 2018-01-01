import React from 'react';
import Header from '../../components/Header/Header.jsx';

export function DefaultLayout(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default DefaultLayout;