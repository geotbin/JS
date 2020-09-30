import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };

    // This binding is necessary to make `this` work in the callback
    this.changeValue = this.changeValue.bind(this);
  }

  /**
   * Update the item quantity with item max stock consideration
   * Block when item stock is reached
   * @param {*} e 
   * @param {*} stock 
   */
  changeValue(e, stock) {
    if (parseInt(e.target.value) > stock) {
      this.setState({ value: stock })
    }
    else {
      this.setState({ value: e.target.value })
    }
  }



  render() {
    const { name, description, image, price, stock } = this.props.article;
    return (
      <div className="item col-xs-4 col-lg-4">
        <div className="thumbnail card">
          <div className="img-event">
            <img className="group list-group-image img-fluid img-responsive" src={image} alt="" />
          </div>
          <div className="caption card-body">
            <h4 className="group card-title inner list-group-item-heading">
              {name}</h4>
            <p className="group inner list-group-item-text">
              {description}</p>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <p className="lead">
                  {price}€</p>
                  <p className="">
                  Stock: {stock}</p>
              </div>
              <div className="col-xs-12 col-md-6">
                <input type="number" className="" min="1" max={stock} value={this.state.value} onChange={(e) => this.changeValue(e, stock)} />
                <i className="cart arrow down icon cart-icon" onClick={() => this.props.updateBasket(this.props.article, this.state.value)}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
