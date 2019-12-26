import React from "react";

// React Router Dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Pages
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

// components

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
