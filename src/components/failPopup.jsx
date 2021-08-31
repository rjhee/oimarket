import React, { Component } from 'react';

class FailPopup extends Component {
  render() {
    return (
      <section className="fail-popup">
        <h2>
          실패ㅠㅠ 다시시도 해보세요
          <span>
            <i class="fas fa-grin-beam-sweat"></i>
          </span>
        </h2>
        <img src="./assets/cucumber3.png" alt="fail" />
      </section>
    );
  }
}

export default FailPopup;
