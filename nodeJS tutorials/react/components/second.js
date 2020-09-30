import React from 'react';
import First from './first';

/* define a stateless React component using a function
* It uses another defined component, here First
*/
const Second =
  () =>
    <div>
      <h3>Second React component that uses another React component</h3>
      <p>below comes a <code>First</code> component</p>
      <First />
    </div>

export default Second;
