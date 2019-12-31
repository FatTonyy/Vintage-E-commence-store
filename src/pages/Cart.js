import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
// import {UserContext}  from '../context/user'

export default function Cart() {
  const { cart, total } = React.useContext(CartContext);
  const { user } = React.useContext(UserContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="cart-items section">
      <h2>Your Cart</h2>
      {cart.map(item => {
        return <CartItem key={item.id} {...item} />;
      })}

      <h2>total : GHC {total}</h2>

      {/* checking to see if user logs in */}
      {user.token ? (
        <Link to="/checkout" className="btn btn-primary btn-block">
          Checkout
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary btn-block">
          login
        </Link>
      )}
    </section>
  );
}
