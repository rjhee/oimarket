import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer>
        <ul className="footer-menu">
          <Link to="/goodsList">
            <li className="footer-home">
              <button>
                <i className="fas fa-home"></i>
              </button>
            </li>
          </Link>
          <li className="footer-around">
            <button>
              <i className="fas fa-map-marked-alt"></i>
            </button>
          </li>
          <Link to="/uploadForm">
            <li className="footer-upload">
              <button>
                <i className="fas fa-plus"></i>
              </button>
            </li>
          </Link>
          <li className="footer-messeage">
            <button>
              <i className="fas fa-comments"></i>
            </button>
          </li>
          <Link to="/userProfile">
            <li className="footer-user-Profile">
              <button>
                <i className="fas fa-user-alt"></i>
              </button>
            </li>
          </Link>
        </ul>
      </footer>
    );
  }
}

export default Footer;
