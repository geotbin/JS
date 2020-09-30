import React from 'react';

import starOn from '../images/star_on.png';
import starOff from '../images/star_off.png';

/*
* define component Star, value is given by props, click on component are forwarded to parnet component using this.props.onStarClicked
*/
export default class Star extends React.Component {
  constructor(props) {
    super(props);
  }

  /* return the image to display depending on state */
  selectSource() {
    if (this.props.on) {
      return starOn;
    } else {
      return starOff;
    }
  }

  /* onClick listener, call the function given by onStarClicked prop to notify parent component of change and then update state*/
  handleClick() {
    this.props.onStarClick();
  }

  render() {
    return(
      <img src= { this.selectSource() }
           onClick= { this.handleClick.bind(this) }
      />
    );
  }
}


// prop-types
import PropTypes from 'prop-types';

Star.defaultProps = {
  on : false
}
Star.propTypes = {
  on : PropTypes.bool
}
