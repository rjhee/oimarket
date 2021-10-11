import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    const navTitle = '오이마켓';
    return (
      <nav>
        <h1 className="nav-logo">
          <i className="fas fa-bacterium logo-icon"></i>
          <strong>{navTitle}</strong>
        </h1>
        <div className="toggle-cover">
          <button className="nav-toggle">
            <i className="fas fa-search"></i>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
