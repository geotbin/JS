import React from 'react';

import '../styles/booklist.css';

import Book from '../components/book.js';

import allbooks from '../data/books.js';   // to mock database

import {DEFAULT_RATING} from '../components/book.js';

/*
* component that displays a list of books
* state managed book values, these values are given to children components using props
* function for managing state change are passed to children through props
*/
export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books : [] }
  }

  /* called just before component is added to DOM tree, here state is initialized from retrieved data (simulated by 'allbooks' value)*/
  componentWillMount() {
    // fetch allbooks data in some database...
    this.setState({ books : allbooks});
  }

  /* manage state change for a book: book with same id is replaced in book list stored in state ('books')
  * @param newbook the new value for the book to update (same id)
  */
  handleBookChange(newbook) {
    let index = this.state.books.findIndex( book => (book.id === newbook.id) );
    let newList = this.state.books;
    newList.splice(index, 1, newbook);
    this.setState({ books : newList });
  }

  /* render all books and rating average */
  render() {
    // build collection of Book components, note the spread operator to create props from book object fields and the 'key' prop based on 'book.id'
    let allbooks = this.state.books.map(
      book =>
        <Book
          {...book}
          onBookChange = { b => this.handleBookChange(b) }
          key = {book.id}
        />
    )

    // commpute sum of all ratings (DEFAULT_RATING from Book if undefined)
    let ratingSum = this.state.books.reduce(
      (acc, book) => (acc + (book.rating ? book.rating : DEFAULT_RATING)), 0
    );
    let averageRating = ratingSum/this.state.books.length;

    return(
        <div className="books">
          <p>Voici la liste des livres. La note moyenne attribuée est : <span> { averageRating } </span></p>
          { allbooks }
        </div>
    );
  }
}
