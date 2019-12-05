import React from 'react';
import {Route} from 'react-router-dom';
import {Home} from 'pages';
import Customer from '../src/components/ContractCustomer';

const App=()=> {
  return (
    <div>
      <Route exact path="/" component={Home}/>
        <Route exact path="/customer" component={Customer}/>
    </div>
  );
}

export default App;
