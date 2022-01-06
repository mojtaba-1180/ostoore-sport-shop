import React from 'react'

import { Route, Switch, useLocation} from 'react-router-dom'
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'

const Routes = () => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={400}
            >
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/shop/:slug' exact component={Product} />
                    <Route path='/shop' exact component={Catalog} />
                    <Route path='/cart' exact component={Cart} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Routes
