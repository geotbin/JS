import React from 'react';
import ReactDOM from 'react-dom';


// import ReactJs component
import BookList from '../components/booklist.js';

/*
*
*/
const bootstrapReact =
  () => ReactDOM.render(
      <BookList />,
      document.getElementById('insertReactHere')
  );

window.addEventListener( 'DOMContentLoaded', bootstrapReact );
