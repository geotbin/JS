import React from 'react';

import '../styles/rating.css';

import Star from './star.js'

/*
* stateless component, rating value is given by parent component
*/
export default class Rating extends React.Component {
  constructor(props) {
    super(props);
  }

  /* change state, fired when a Star child component is clicked
   * @param starNum the index of the clicked Star and set it as new state value
  */
  handleStarClicked(starNum) {
    let newValue = starNum + 1;
    if (starNum === 0 && this.props.value === 1) {
      newValue =  0;
    }
    // call function given by parent component to "ask" for a state change
    this.props.onRatingChange( newValue );
  }

  render() {

    let stars = new Array(5).fill(0).map(
        (e,i) => <Star
                    on= { i < this.props.value }
                    onStarClick = { () => this.handleStarClicked(i)  /* pass the function to change state to child component */}
                    key={i}
                  />
      );
    return(
        <span className="rating">
          {stars}
          <span>({this.props.value})</span>
        </span>
     );
 }
}

// prop-types
import PropTypes from 'prop-types';

Rating.propTypes = {
  value : PropTypes.number
}
