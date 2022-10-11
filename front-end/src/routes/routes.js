import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Products from '../pages/products/Products';
import Checkout from '../pages/checkout/Checkout';
import Orders from '../pages/orders/Orders';
import OrderDetails from '../pages/orders/OrderDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/seller/orders" component={ Orders } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      <Route exact path="/seller/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default Routes;
