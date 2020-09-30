import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ArticleBasket from './articleBasket.js';

export default class Basket extends Component{
  constructor(props){
    super(props);
    this.state={
      price: 0,
    }
  }

  /**
   * Render the entire basket
   * Call articleBasket for each articles in basket
   * Submit button to update changes in the database
   */
  render(){
    return(
      <div className="basket-part">
      <div className="basket">
      {this.props.basket.map((article, i) => (
          <ArticleBasket key={i} article={article} decreaseBasket={this.props.decreaseBasket}/>
      ))}

        <div className="fixed-left">Total du panier: {this.props.total} €
          <i className="trash icon trash-icon" onClick={() => this.props.emptyBasket()}></i>
        </div>
        <button className="btn-small btn-success fixed-right" type="submit" onClick={() => this.props.updateQty(this.props.basket)}>ACHETER</button>

      </div>
      </div>
    )
  }
}
