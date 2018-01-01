import React from 'react';
import { Monitor, Smartphone } from 'react-feather';

//https://standards.freedesktop.org/icon-naming-spec/icon-naming-spec-latest.html
export default function (props) {
  if (props.icon === 'phone') {
    return <Smartphone {...props} />;
  } else if (props.icon === 'computer') {
    return <Monitor {...props} />;
  } 
  return null;
}; 