import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import Home from './core/Home'
import Cart from './core/Cart'
import Dashboard from './user/Dashboard'
import Signin from './user/Signin'
import Signup from './user/Signup'


const Routes = () => {
    return (
        <BrowserRouter>
            <switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/signin' exact component={Signin}/>
                <PrivateRoutes path='/user/dashboard/' exact component={Dashboard}/>
                <PrivateRoutes path='/cart' exact component={Cart}/>
            </switch>
        </BrowserRouter>
    );
}

export default Routes;

