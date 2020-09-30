import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Article from './article.js';
import Basket from './basket.js';




export default class Catalogue extends Component{
  constructor(props){
    super(props);

    this.state =  {articles: [], basket: [], total: 0, searchTerm: ''}

    // This binding is necessary to make `this` work in the callback
    this.updateBasket = this.updateBasket.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this);
    this.decreaseBasket = this.decreaseBasket.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateQty = this.updateQty.bind(this);
  }

  componentDidMount(){
    let self = this;
    let url = "/admin/api/articles"
    fetch(url, {mode: 'no-cors'})
.then(response => response.json())
.then(data => this.setState({articles: data}));
}

/* 
* Empty the basket, re-add quantities of the selected items
* Set the total price to 0 
*/
emptyBasket(){

let copyArticles = this.state.articles.slice().map(o => ({...o}));
this.state.basket.forEach(function(elem){
    let index = copyArticles.findIndex(art => art._id === elem._id);
    if(index !== -1){
          copyArticles[index].stock += elem.qty;
    }

})
  // update set with empty basket, articles and total price
  this.setState({basket: [], articles: copyArticles, total: 0});
}

/**
 * change searchTerm in the State for the reactJS filter
 * Updated everytime the input text changed
 * @param {*} event 
 */
updateSearch(event){
  this.setState({searchTerm: event.target.value});
}

/**
 * 
 * @param {*} data 
 * This function is called to update the quantity of the basket's items when the user validate his order
 * The submit button call this function
 * Send a PUT request to adminController with all the basket's (contains id, name, description,qty..)
 */
updateQty(data){
  console.log(data);
  // if basket is empty
  if(data.length === 0){
    window.alert("Vous devez selectionner au moins un article")
  } else {
    // transform array into string
    let body = JSON.stringify(data);

    let requestOptions = {method: 'PUT', headers: {"Content-Type": "application/json"}, body: body};
    fetch(`http://localhost:3002/admin/qty`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error lors de la mise à jour  : ${response.json.message}`);
            }
            window.alert("Mise à jour effectué.")
            this.setState({basket:[], total: 0})
        })
        .catch(error => window.alert(error.message));
      
  }
}

/**
 * Delete specific item from basket
 * Re-add quantity of the specific item (in the shop page)
 * Update total price in the basket part
 * @param {*} article 
 * @param {*} value 
 */
decreaseBasket(article, value){

  value = value.qty
  let index = this.state.basket.findIndex(art => art._id === article._id);
  let copyArticles = this.state.articles.slice().map(o => ({...o}));
  let copyArticle = {...article};
  let totalPrice;

  //re-add the basket item quantity into the right shop item
  copyArticles.forEach(function(elem){
    if(elem._id === copyArticle._id){
      elem.stock += value;
      copyArticle.qty = 0;
      totalPrice = copyArticle.price * value;
    }
  });

  // delete item from basket
  if(index === -1){
    this.setState(prevState => ({basket: [...prevState.basket, copyArticle], articles: copyArticles, total: this.state.total + totalPrice}));
  }else{
      let copyBasket = this.state.basket.slice().map(o => ({...o}));
      let total = this.state.total - totalPrice;
      copyArticle.qty = 0;
      this.setState({basket: copyBasket.filter((_, i) => i !== index), articles: copyArticles, total: total});
  }

}

/**
 * Add selected article in the basket
 * Decrease the quantity on the shop
 * Increase the item quantity on the basket (if this item is already in)
 * @param {*} article 
 * @param {*} value 
 */
updateBasket(article, value){

      value = parseFloat(value);
      if(article.stock === 0) return;

      let index = this.state.basket.findIndex(art => art._id === article._id);
      let copyArticles = this.state.articles.slice().map(o => ({...o}));
      let copyArticle = {...article};
      let totalPrice;

      // search the right article, decrease his stock on the shop page
      copyArticles.forEach(function(elem){
        if(elem._id === copyArticle._id){
          elem.stock -= value;
          copyArticle.qty = value;

          totalPrice = copyArticle.price * value;

        }
      })
      // add item in the basket part
      if(index === -1){
        this.setState(prevState => ({basket: [...prevState.basket, copyArticle], articles: copyArticles, total: this.state.total + totalPrice}));
      }else{
          let copyBasket = this.state.basket.slice().map(o => ({...o}));
          let total = this.state.total + totalPrice;

          copyBasket[index].qty += value;

          this.setState({basket: copyBasket, articles: copyArticles, total: total});
      }
}

/**
 * Render the shop part with filter input
 */
  render(){

    // filter : return all items which contains searchTerm (in state) OR return all items when input text is empty
    let filteredList = this.state.articles.filter(a => {
      return a.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1
    })

    return(
      <div>
      <div className="form-group filtre">
        <input className="form-control" type="text" placeholder="FILTRAGE PAR NOM" onChange={this.updateSearch} />
      </div>
      <div className="shop">
      <div className="catalogue">
      { filteredList.map((article) => (
          <Article key={article._id} article={article} updateBasket={this.updateBasket}/>
      ))}


      </div>
            <Basket basket={this.state.basket} total={this.state.total} emptyBasket={this.emptyBasket} decreaseBasket={this.decreaseBasket} updateQty={this.updateQty}/>
      </div>
      </div>
    )
  }
}
