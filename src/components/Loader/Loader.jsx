import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './loader.scss';

export default class Loader extends Component {
  static sizes = {
    md: 'md',
    sm: 'sm',
    xs: 'xs',
    lg: 'lg'
  };

  static defaultProps = {
    visible: false,
    className: '',
    fillClassName: '',
    size: '',
    fill: true
  };

  static propTypes = {
    fill: PropTypes.bool,
    fillClassName: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool,
    size: PropTypes.oneOf([...Object.values(Loader.sizes), ''])
  };

  render() {
    const classes = [ this.props.className ];
    classes.push(this.props.visible ? 'visible' : 'hidden');
    classes.push(this.props.children ? 'mt-auto' : 'my-auto');
    if (this.props.size) {
      classes.push('loader-' + this.props.size);
    }
    
    const out = (
      <div className={`loader ${classes.join(' ')}`}> 
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10"/>
        </svg>
      </div>
    );

    if (this.props.fill) {
      return (
        <div className={`${this.props.fillClassName} loader-fill ${this.props.visible ? 'visible' : 'hidden'}`}>
          {out}
          {this.props.children 
            ? <div className="content">{this.props.children}</div> 
            : null
          }
        </div>
      );
    }

    return out;
  }
}