import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
  userNameRef = React.createRef();
  userEmailRef = React.createRef();
  userPasswordRef = React.createRef();

  handleUserSignUp = (event) => {
    event.preventDefault();
    const userName = this.userNameRef.current.value;
    const userEmail = this.userEmailRef.current.value;
    const userPassword = this.userPasswordRef.current.value;
    this.props.onUserSignUp(userName, userEmail, userPassword);
  };

  render() {
    return (
      <section className="sign-up">
        <h1>회원가입</h1>
        <form onSubmit={this.handleUserSignUp}>
          <input
            ref={this.userNameRef}
            type="text"
            placeholder="이름"
            className="user-name"
            autoFocus
            required
          />
          <input
            ref={this.userEmailRef}
            type="email"
            placeholder="이메일@email.com"
            className="user-email"
            required
          />
          <input
            ref={this.userPasswordRef}
            type="password"
            placeholder="비밀번호 (4자리 이상)"
            className="user-password"
            required
          />
          <div className="line"></div>
          <button type="submit" className="sign-up-btn">
            가입하기
          </button>
        </form>
        <div className="signIn-link">
          <span>회원이신가요?</span>
          <Link to="/loginForm">
            <button>로그인하기</button>
          </Link>
        </div>
      </section>
    );
  }
}

export default SignUpForm;
