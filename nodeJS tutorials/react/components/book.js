import React from 'react';

import '../styles/book.css';

import Rating from '../components/rating.js';

export const DEFAULT_RATING = 3;

/*
* Book component, values are given by parent component using props
*/
export default class Book extends React.Component {
  constructor(props) {
    super(props);
  }

  /* rating has changed, a new book is built from this one and update is "forwarded" to parent that handled state */
  handleRatingChange(newRating) {
    // use spread notation on object to built an object with field with same values than 'this.props' and then a new rating is set
    let book = { ...this.props, rating : newRating};
    // call function given by parent component in order to change state
    this.props.onBookChange(book);
  }

  /* fired when button is clicked, this function acts on a DOM element, then it is necessary to have a reference to this element*/
  highlightTitle() {
    this.titleSpan.style.backgroundColor = "yellow";
    // this.titleSpan has been defined by the callback defined by 'ref' in first span below, callback has been called just before component is mounted
    window.setTimeout( () => {this.titleSpan.style.backgroundColor = "initial" } , 1000 )
  }

  render() {
      return(
        <div className="book">
          {/* ref attribute allows to define a callback function that takes the created DOM element as parameter, classicaly it is used to make a link with an attribute, here this.titelSpan */}
          <span
              className="title"
              ref={ span => this.titleSpan = span }
          >{this.props.title}</span>
          <span className="author">{this.props.author}</span>
          <span className="year">{this.props.year}</span>
          <Rating
              value={this.props.rating}
              onRatingChange = { rating => this.handleRatingChange(rating) }
          />
          <button onClick={ ()=>this.highlightTitle() }>highlight title</button>
        </div>
        );
      }
}


// Prop-Types
import PropTypes from 'prop-types';

Book.defaultProps = {
  rating : DEFAULT_RATING
}
Book.propTypes = {
  title : PropTypes.string,
  author : PropTypes.string,
  year : PropTypes.number,
  rating : PropTypes.number.isRequired
}
