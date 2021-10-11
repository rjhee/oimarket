import React, { Component } from 'react';

class Popup extends Component {
  render() {
    return (
      <section className="success-popup">
        <h2>
          성공적으로 게시 되었습니다
          <span>
            <i className="far fa-thumbs-up"></i>
          </span>
        </h2>
        <img src="./assets/cucumber1.png" alt="success" />
      </section>
    );
  }
}

export default Popup;
