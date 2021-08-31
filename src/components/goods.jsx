import React, { Component } from 'react';

class Goods extends Component {
  render() {
    const { title, price, location, likeNum, time, img, id } = this.props.data;
    const goodsImg = { backgroundImage: `url(${img})` };

    return (
      <li className="goods">
        <div className="goods-img" style={goodsImg}></div>
        <div className="goods-info">
          <h3 className="goods-title">{title}</h3>
          <div className="upload-info">
            <span className="upload-location">{location}</span>
            <span className="upload-date">{time}</span>
          </div>
          <strong className="goods-price">{price}원</strong>
          <div className="btn-group">
            <div className="like">
              <i className="far fa-heart like-btn"></i>
              <span className="like-num">{likeNum}</span>
            </div>
            <div className="comment">
              <i className="far fa-comment comment-btn"></i>
              <span className="comment-num">0</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Goods;
