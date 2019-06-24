import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Form from './pages/Form'
import List from './pages/List'

function Routes(){
  return (
      <Switch>
        <Route path="/add" exact component={Form}/>
        <Route path="/" exact component={List}/>
      </Switch>
  )
}

export default Routes