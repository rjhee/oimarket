import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserFrofile extends Component {
  render() {
    return (
      <section className="user-frofile">
        <Link to="/loginForm">
          <button className="user-frofile-login">로그인</button>
        </Link>
        <Link to="/signUpForm">
          <button className="user-frofile-sign-up">회원가입</button>
        </Link>
        <button onClick={this.props.logout} className="user-frofile-logout">
          로그아웃
        </button>
      </section>
    );
  }
}

export default UserFrofile;
