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
                <i class="fas fa-home"></i>
              </button>
            </li>
          </Link>
          <li className="footer-around">
            <button>
              <i class="fas fa-map-marked-alt"></i>
            </button>
          </li>
          <Link to="/uploadForm">
            <li className="footer-upload">
              <button>
                <i class="fas fa-plus"></i>
              </button>
            </li>
          </Link>
          <li className="footer-messeage">
            <button>
              <i class="fas fa-comments"></i>
            </button>
          </li>
          <Link to="/userFrofile">
            <li className="footer-user-frofile">
              <button>
                <i class="fas fa-user-alt"></i>
              </button>
            </li>
          </Link>
        </ul>
      </footer>
    );
  }
}

export default Footer;
