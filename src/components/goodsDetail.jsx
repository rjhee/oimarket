import React, { Component } from 'react';

class GoodsDetail extends Component {
  componentWillMount = () => {
    this.props.onShowDetail();
  };
  render() {
    const {
      id,
      title,
      price,
      desc,
      user,
      time,
      img,
      location,
      likeNum,
      chat,
      views,
    } = this.props.detailData[0];
    const detailImg = { backgroundImage: `url(${img})` };

    return (
      <section className="goods-detail">
        <div className="img-cover">
          <span className="goods-detail-img" style={detailImg}></span>
        </div>
        <div className="goods-detail-contents">
          <h1 className="goods-detail-title">{title}</h1>
          <strong className="info-price">{price} 원</strong>

          <div className="goods-detail-info">
            <div className="info-user">
              <div className="user-photo">
                <i class="fas fa-user"></i>
              </div>
              <div className="user-info-group">
                <strong className="user-id">{user}</strong>
                <span className="user-location">{location}</span>
              </div>
            </div>
          </div>

          <p className="goods-detail-desc">{desc}</p>
          <div className="goods-detail-count">
            <span className="count-date">{time}</span>
            <div>
              <span className="count-like">찜 {likeNum}</span>
              <span className="count-comment">채팅 {chat}</span>
              <span className="count-views">조회 {views}</span>
            </div>
          </div>
          <div className="goods-detail-btn">
            <button className="like-btn">
              <i class="fas fa-heart"></i>
            </button>
            <button className="chat-btn">채팅하기</button>
          </div>
        </div>
      </section>
    );
  }
}

export default GoodsDetail;
