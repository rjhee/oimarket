import React, { Component } from 'react';
import Goods from './goods';
import { Link } from 'react-router-dom';

class GoodsList extends Component {
  handleGetDetaildata = () => {
    this.props.onGetDetailData();
  };
  render() {
    // console.log(this.props.data);
    return (
      <ul className="goods-list" onClick={this.handleGetDetaildata}>
        {this.props.data.map((data) => (
          <Link to={'/goodsDetail?id=' + data.id}>
            <Goods key={data.id} data={data} />
          </Link>
        ))}
      </ul>
    );
  }
}

export default GoodsList;
