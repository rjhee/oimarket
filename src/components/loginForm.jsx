import React, { Component } from 'react';

class LoginForm extends Component {
  userNameRef = React.createRef();
  userEmailRef = React.createRef();
  userPasswordRef = React.createRef();

  handleUserLogin = (event) => {
    event.preventDefault();

    const userEmail = this.userEmailRef.current.value;
    const userPassword = this.userPasswordRef.current.value;
    this.props.onUserLogin(userEmail, userPassword);
  };
  render() {
    return (
      <section className="login">
        <h1>로그인</h1>
        <form onSubmit={this.handleUserLogin}>
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
          <button type="submit" className="login-btn">
            로그인하기
          </button>
        </form>
        <div className="signUp-link">
          <span>회원이아니신가요?</span>
          <button>회원가입하기</button>
        </div>
      </section>
    );
  }
}

export default LoginForm;
