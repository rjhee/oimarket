import React, { Component } from 'react';

class EditForm extends Component {
  state = {
    detailData: [{ title: '', price: '', desc: '', time: '', img: '' }],
  };

  editFormRef = React.createRef();
  editTitleRef = React.createRef();
  editPriceRef = React.createRef();
  editDescRef = React.createRef();
  editImgRef = React.createRef();

  handleEditGoods = (event) => {
    event.preventDefault();
    const title = this.editTitleRef.current.value;
    const desc = this.editDescRef.current.value;
    const price = this.editPriceRef.current.value;
    const img = this.editImgRef.current.files[0];
    this.props.onSubmit(title, desc, price, img);
  };

  handleEditGoodsDetail = (e) => {
    switch (e) {
      case e.target.className === 'upload-title':
        this.setState({ editTitle: e.target.value });
        break;
      case e.target.className === 'upload-price':
        this.setState({ editPrice: e.target.value });
        break;
      case e.target.className === 'upload-desc':
        this.setState({ editDesc: e.target.value });
        break;
      case e.target.className === 'upload-img':
        this.setState({ editImg: e.target.value });
        break;
      // no default
    }
  };

  componentDidMount = () => {
    const editDetailData = this.props.editDetailData;
    const editDetailDataCopy = {};
    Object.assign(editDetailDataCopy, editDetailData);
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
    } = editDetailDataCopy;
    this.setState({ detailData: [{ title, price, desc, time, img }] });
  };

  render() {
    const editDetailData = this.props.editDetailData;
    const editDetailDataCopy = {};
    Object.assign(editDetailDataCopy, editDetailData);
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
    } = editDetailDataCopy;
    return (
      <form
        ref={this.editFormRef}
        className="upload-form"
        onSubmit={this.handleEditGoods}
      >
        <input
          ref={this.editTitleRef}
          type="text"
          className="upload-title"
          placeholder="??? ??????"
          autoFocus
          value={(title, this.state.editTitle)}
          onChange={this.handleEditGoodsDetail}
        />

        <input
          ref={this.editPriceRef}
          type="text"
          className="upload-price"
          placeholder="??? ?????? ??????"
          value={this.state.editPrice}
          onChange={this.handleEditGoodsDetail}
        />
        <textarea
          ref={this.editDescRef}
          className="upload-desc"
          placeholder="???????????? ????????? ?????? ????????? ??????????????????!"
          value={this.state.editDesc}
          onChange={this.handleEditGoodsDetail}
        ></textarea>
        <label htmlFor="upload-img" className="upload-img">
          ???????????????
        </label>
        <input
          ref={this.editImgRef}
          type="file"
          id="upload-img"
          className="hidden"
          accept="image/*"
        />
        <div className="btn-group">
          <button
            type="button"
            className="close-btn"
            onClick={this.handleEditGoodsDetail}
          >
            ????????????
          </button>
          <button type="submit" className="upload-btn">
            ????????????
          </button>
        </div>
      </form>
    );
  }
}

export default EditForm;
