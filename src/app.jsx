import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { firestore, storage, signUp, signIn, logout } from './fireBase';

import './styles/app.css';
import Navbar from './components/navbar';
import GoodsList from './components/goodsList';
import Footer from './components/footer';
import UploadForm from './components/uploadForm';
import SuccessPopup from './components/successPopup';
import FailPopup from './components/failPopup';
import SignUpForm from './components/signUpForm';
import LoginForm from './components/loginForm';
import UserFrofile from './components/userFrofile';
import GoodsDetail from './components/goodsDetail';
// import { faSubscript } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    data: [],
    datas: '',
    popup: '',
    detailData: [
      {
        id: '',
        title: '',
        price: '',
        desc: '',
        user: '',
        time: '',
        img: '',
        location: '',
        likeNum: '',
        chat: '',
        viwes: '',
      },
    ],
  };
  componentDidMount() {
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
  }

  handleUploadGoods = (title, desc, price, img = 'img') => {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();

    let storageRef = storage.ref();
    let imgSavePath = storageRef.child(`image/${img.name}`);
    let uploadImg = imgSavePath.put(img);

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
          let data = {
            id: date.getTime(),
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

  handleUserLogin = (email, password) => {
    signIn(email, password).then((result) => {
      console.log(result);
    });
  };

  handleUserLogout = () => {
    logout().then(console.log('성공'));
  };

  handleShowDetail = () => {
    const detailData = [...this.state.detailData];
    let queryString = new URLSearchParams(window.location.search);
    firestore
      .collection('product')
      .doc(queryString.get('id'))
      .get()
      .then((snap) => {
        let detail = snap.data();
        detailData.push({
          id: detail.id,
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
        detailData.shift();
        this.setState({ detailData });
      });
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          {this.state.popup}
          <Switch>
            <Route
              exact
              path="/"
              render={() => <LoginForm onUserLogin={this.handleUserLogin} />}
            />
            <Route
              exact
              path="/goodsList"
              render={() => <GoodsList data={this.state.data} />}
            />

            <Route
              exact
              path="/uploadForm"
              render={() => <UploadForm onSubmit={this.handleUploadGoods} />}
            />
            <Route
              exact
              path="/userFrofile"
              render={() => <UserFrofile logout={this.handleUserLogout} />}
            />
            <Route
              exact
              path="/signUpForm"
              render={() => <SignUpForm onUserSignUp={this.handleUserSignUp} />}
            />

            <Route
              exact
              path="/goodsDetail"
              render={() => (
                <GoodsDetail
                  onShowDetail={this.handleShowDetail}
                  detailData={this.state.detailData}
                />
              )}
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
