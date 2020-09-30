import React from 'react';
import PropTypes from 'prop-types';


import '../styles/person.css';

/*
 * define component as a class that extends React.component
*/
export default class Person extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <div className="person">I am :
          <dl>
            <dt>name</dt><dd> { this.props.name } </dd>
            <dt>age</dt><dd> { this.props.age } </dd>
          </dl>
        </div>
      );
    }

}


Person.defaultProps = {
  name : 'Anonymous'
}

Person.propTypes = {
  name : PropTypes.string,
  age : PropTypes.number.isRequired
}
