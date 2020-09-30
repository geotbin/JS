import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Catalogue from '../components/catalogue.js';

export default class HomePage extends Component{
  render(){
    return(
        <Catalogue/>
    );
  }
}


if(document.getElementById('insertReactHere')){
  ReactDOM.render(<HomePage />, document.getElementById('insertReactHere'));
}
