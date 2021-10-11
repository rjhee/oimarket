import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  firestore,
  storage,
  signUp,
  signIn,
  logout,
  firebaseAppAuth,
} from './fireBase';

import './styles/app.css';
import Navbar from './components/navbar';
import GoodsList from './components/goodsList';
import Footer from './components/footer';
import UploadForm from './components/uploadForm';
import SuccessPopup from './components/successPopup';
import FailPopup from './components/failPopup';
import SignUpForm from './components/signUpForm';
import LoginForm from './components/loginForm';
import UserProfile from './components/userProfile';
import GoodsDetail from './components/goodsDetail';
import EditForm from './components/editForm';
// import { faSubscript } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    data: [],
    datas: '',

    popup: '',
    detailData: [],
    footer: false,
    main: false,
    userLocalStorage: [
      { uid: '', userName: '', userEmail: '', userLocation: '회덕동' },
    ],
    editDetailData: '',
  };

  handleShowGoodsList = () => {
    const data = [...this.state.data];
    firestore
      .collection('product')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          data.push({
            id: doc.id,
            title: doc.data().title,
            price: doc.data().price,
            location: doc.data().location,
            likeNum: doc.data().likeNum,
            time: doc.data().time,
            img: doc.data().img,
          });
          this.setState({ data });
        });
      });
  };

  handleUploadGoods = (title, desc, price, img = 'img') => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();

    const storageRef = storage.ref();
    const imgSavePath = storageRef.child(`image/${img.name}`);
    const uploadImg = imgSavePath.put(img);

    uploadImg.on(
      'state_changed',
      // 변화시 동작하는 함수
      null,
      // 에러시 동작하는 함수
      (error) => {
        console.log('실패사유는', error);
      },
      // 성공시 동작하는 함수
      () => {
        uploadImg.snapshot.ref.getDownloadURL().then((url) => {
          console.log('업로드된 결과는', url);
          const data = {
            id: date.getTime(),
            uid: JSON.parse(localStorage.getItem('user')).uid,
            user: JSON.parse(localStorage.getItem('user')).displayName,
            title: title,
            desc: desc,
            price: Number(price),
            img: url,
            time: `${month}월${day}일`,
          };

          firestore
            .collection('product')
            .add(data)
            .then((result) => {
              console.log(result);
              this.setState({ popup: <SuccessPopup /> });
              setTimeout(() => {
                this.setState({ popup: '' });
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
              this.setState({ popup: <FailPopup /> });
              setTimeout(() => {
                this.setState({ popup: '' });
              }, 1000);
            });
        });
      }
    );
  };

  handleUserSignUp = (name, email, password) => {
    signUp(email, password).then((result) => {
      console.log(result);
      result.user.updateProfile({ displayName: name });
    });
  };

  handleUserLogin = async (email, password) => {
    signIn(email, password).then((result) => {
      console.log('로그인성공');
    });
  };

  handleUserLogout = () => {
    logout().then(console.log('로그아웃성공'));
    localStorage.removeItem('user');
  };

  handleGetDetailData = () => {
    const detailData = [...this.state.detailData];
    const queryString = new URLSearchParams(window.location.search);
    firestore
      .collection('product')
      .doc(queryString.get('id'))
      .get()
      .then((snap) => {
        const detail = snap.data();
        detailData.push({
          id: snap.id,
          title: detail.title,
          price: detail.price,
          desc: detail.desc,
          user: detail.user,
          time: detail.time,
          img: detail.img,
          location: detail.location,
          likeNum: detail.likeNum,
          chat: detail.chat,
          viwes: detail.viwes,
        });
        this.setState({ detailData });
        detailData.shift();
      });
  };

  handleGeteditDetailData = () => {
    const editDetailData = [...this.state.editDetailData];
    const queryString = new URLSearchParams(window.location.search);
    firestore
      .collection('product')
      .doc(queryString.get('id'))
      .get()
      .then((snap) => {
        const detail = snap.data();
        editDetailData.push({
          id: snap.id,
          title: detail.title,
          price: detail.price,
          desc: detail.desc,
          user: detail.user,
          time: detail.time,
          img: detail.img,
          location: detail.location,
          likeNum: detail.likeNum,
          chat: detail.chat,
          viwes: detail.viwes,
        });

        this.setState({ editDetailData });
        editDetailData.shift();
      });
    console.log(this.state.editDetailData);
  };

  handleGetUserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userLocalStorage = [
      ...this.state.userLocalStorage,
      {
        uid: user.uid,
        userName: user.displayName,
        userEmail: user.email,
      },
    ];
    this.setState({ userLocalStorage });
  };

  handleShowUserProfile = () => {
    firebaseAppAuth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ footer: true });
        this.handleGetUserProfile();
      } else {
        this.setState({
          login: <LoginForm onUserLogin={this.handleUserLogin} />,
        });
      }
    });
  };

  componentDidMount = () => {
    this.handleShowGoodsList();
    this.handleShowUserProfile();
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          {this.state.popup}
          {this.state.main === true ? (
            <GoodsList
              data={this.state.data}
              onGetDetailData={this.handleGetDetailData}
            />
          ) : null}
          <Switch>
            <Route
              exact
              path="/loginForm"
              render={() => <LoginForm onUserLogin={this.handleUserLogin} />}
            />
            <Route
              exact
              path="/goodsList"
              render={() => (
                <GoodsList
                  key={this.state.data.id}
                  data={this.state.data}
                  onGetDetailData={this.handleGetDetailData}
                />
              )}
            />

            <Route
              exact
              path="/uploadForm"
              render={() => <UploadForm onSubmit={this.handleUploadGoods} />}
            />
            <Route
              exact
              path="/userProfile"
              render={() => (
                <UserProfile
                  logout={this.handleUserLogout}
                  userLocalStorage={this.state.userLocalStorage[1]}
                  // onGetUserProfile={this.handleGetUserProfile}
                />
              )}
            />
            <Route
              exact
              path="/signUpForm"
              render={() => <SignUpForm onUserSignUp={this.handleUserSignUp} />}
            />

            <Route
              exact
              path="/GoodsDetail"
              render={() => (
                <GoodsDetail
                  detailData={this.state.detailData}
                  onEditDetail={this.handleGeteditDetailData}
                />
              )}
            />
            <Route
              exact
              path="/editForm"
              render={() => (
                <EditForm
                  editDetailData={this.state.editDetailData}
                  onSubmit={this.handleUploadGoods}
                />
              )}
            />
          </Switch>
          {this.state.footer === true ? (
            <Footer></Footer>
          ) : (
            <LoginForm onUserLogin={this.handleUserLogin} />
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
