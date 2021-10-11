import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GoodsDetail extends Component {
  state = {
    detailDataCopy: [],
  };

  render() {
    const detailData = this.props.detailData[0];
    const detailDataCopy = {};
    Object.assign(detailDataCopy, detailData);

    const {
      id,
      user,
      time,
      title,
      desc,
      price,
      img,
      location,
      likeNum,
      views,
      chat,
    } = detailDataCopy;

    const detailImg = {
      backgroundImage: `url(${img})`,
    };

    return (
      <section className="goods-detail" id={id}>
        <div className="img-cover">
          <span className="goodsImg" style={detailImg}></span>
        </div>
        <div className="goods-detail-contents">
          <h1 className="title">{title}</h1>
          <div className="detail-btn-cover">
            <Link to={'/editForm?id=' + id}>
              <button className="edit" onClick={this.props.onEditDetail}>
                수정
              </button>
            </Link>
            <button className="delete">삭제</button>
          </div>
          <strong className="price">{price} 원</strong>
          <div className="goods-detail-info">
            <div className="user-profile">
              <div className="user-photo">
                <i class="fas fa-user"></i>
              </div>
              <div className="user-profile-cover">
                <span className="user-name">{user}</span>
                <span className="user-location">{location}</span>
              </div>
            </div>
          </div>

          <p className="goods-detail-desc">{desc}</p>
          <div className="goods-detail-count">
            <span className="date">{time}</span>
            <div>
              <span className="like">찜 {likeNum}</span>
              <span className="comment">채팅 {chat}</span>
              <span className="views">조회 {views}</span>
            </div>
          </div>
          <div className="goods-detail-btn">
            <button className="like-btn">
              <i className="fas fa-heart"></i>
            </button>
            <button className="chat-btn">채팅하기</button>
          </div>
        </div>
      </section>
    );
  }
}

export default GoodsDetail;
