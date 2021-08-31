import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <h1 className="nav-logo">
          <i className="fas fa-bacterium logo-icon"></i>
          <strong>오이 마켓</strong>
        </h1>
        <button className="nav-toggle">
          <i className="fas fa-bars"></i>
        </button>
      </nav>
    );
  }
}

export default Navbar;
