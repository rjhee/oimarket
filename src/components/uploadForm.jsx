import React, { Component } from 'react';

class UploadForm extends Component {
  formRef = React.createRef();
  titleRef = React.createRef();
  priceRef = React.createRef();
  descRef = React.createRef();
  imgRef = React.createRef();

  handleUploadGoods = (event) => {
    event.preventDefault();
    const title = this.titleRef.current.value;
    const desc = this.descRef.current.value;
    const price = this.priceRef.current.value;
    const img = this.imgRef.current.files[0];
    this.props.onSubmit(title, desc, price, img);
  };

  render() {
    return (
      <form
        ref={this.formRef}
        className="upload-form"
        onSubmit={this.handleUploadGoods}
      >
        <input
          ref={this.titleRef}
          type="text"
          className="upload-title"
          placeholder="글 제목"
          autoFocus
        />
        <input
          ref={this.priceRef}
          type="text"
          className="upload-price"
          placeholder="₩ 상품 가격"
        />
        <textarea
          ref={this.descRef}
          className="upload-desc"
          placeholder="판매하실 상품에 대한 설명을 입력해주세요!"
        ></textarea>
        <label htmlFor="upload-img" className="upload-img">
          파일업로드
        </label>
        <input
          ref={this.imgRef}
          type="file"
          id="upload-img"
          className="hidden"
          accept="image/*"
        />
        <div className="btn-group">
          <button className="close-btn">뒤로가기</button>
          <button type="submit" className="upload-btn">
            글 올리기
          </button>
        </div>
      </form>
    );
  }
}

export default UploadForm;
