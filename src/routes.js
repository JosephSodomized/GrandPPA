import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './components/Home'
import Meds from './components/Meds'

class Routes extends Component {
    render(){
        return(
            <Switch>
                <Route path="/meds" exact component={Meds}/>
                <Route path="/" exact component={Home}/>
            </Switch>
        )
    }
}

export default Routes;
