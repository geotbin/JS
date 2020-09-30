import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class ArticleBasket extends Component{
  constructor(props){
    super(props);

  }

  /**
   * Render each items selected by the user
   * Trash icon associed to delete item from basket
   */
  render(){
    const {name, price, qty} = this.props.article;

    return(
      <div className="article-basket">
        <div className="articleb-name">{name}</div>
        <div className="articleb-price">Prix total : {price*qty}€</div>
        <div className="articleb-qty">Quantité: {qty} <i className="trash icon trash-icon" onClick={() => this.props.decreaseBasket(this.props.article, {qty})}></i></div>
      </div>
    )
  }
}
