import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
  // state = {
  //   userProfile: [{}],
  // };
  // componentDidMount = () => {
  //   const thisUserProfile = this.props.onGetUserProfile();
  //   const { userUid, userName, userEmail } = thisUserProfile[0];
  //   const userProfileCopy = {};
  //   Object.assign(userProfileCopy, thisUserProfile);
  //   const userProfile = [
  //     ...this.state.userProfile,
  //     {
  //       userUid: userProfileCopy[0].uid,
  //       userName: userProfileCopy[0].userName,
  //       userEmail: userProfileCopy[0].userEmail,
  //     },
  //   ];
  //   this.setState({ userProfile });
  // };

  render() {
    const userProfileCopy = {};
    const userProfile = this.props.userLocalStorage;
    Object.assign(userProfileCopy, userProfile);
    const { uid, userName, userEmail } = userProfileCopy;

    return (
      <div className="user">
        <section className="user-profile">
          <div className="user-profile-info">
            <label className="user-photo-cover" htmlFor="user-photo">
              <i className="fas fa-user photo"></i>
              <i className="fas fa-camera camera"></i>
            </label>
            <input
              type="file"
              accept="image/*"
              id="user-photo"
              className="hidden"
            />
            <div className="user-profile-cover">
              <h1 className="name">{userName}</h1>
              <span className="location">{uid}</span>
              <span className="email">{userEmail}</span>
            </div>
          </div>
          <div className="user-profile-item">
            <button className="user-goods-total">
              <i className="fas fa-store"></i>
            </button>
            <button className="like-total">
              <i className="fas fa-heart"></i>
            </button>
            <button className="setting">
              <i className="fas fa-cog"></i>
            </button>
          </div>
          <div className="line"></div>
          <div className="user-profile-service">
            <button className="notice">
              <i className="fas fa-bell"></i>
              <span> 공지사항</span>
            </button>
            <button className="service-center">
              <i className="fas fa-headset"></i>
              <span> 고객센터</span>
            </button>
            <button className="questions">
              <i className="far fa-question-circle"></i>
              <span>자주하는 질문</span>
            </button>
            <button className="madein">
              <i className="fas fa-users"></i>
              <span> 만든사람</span>
            </button>
          </div>
        </section>
        <div className="line"></div>
        <section className="user-profile-btn">
          <Link to="/loginForm">
            <button className="user-profile-login">로그인</button>
          </Link>
          <Link to="/signUpForm">
            <button className="user-profile-sign-up">회원가입</button>
          </Link>
          <Link to="/">
            <button onClick={this.props.logout} className="user-profile-logout">
              로그아웃
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

export default UserProfile;
