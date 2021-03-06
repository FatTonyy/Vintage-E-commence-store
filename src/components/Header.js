import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import CartLink from "../components/Cart/CartLink";
import { UserContext } from "../context/user";
import LoginLink from "../components/LoginLink";

export default function Header() {
  const { user } = React.useContext(UserContext);
  return (
    <header className="header">
      <img src={logo} alt="Vintage tech logo" className="logo" />
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </div>

          {user.token && (
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          )}
          <div>
            {/* <li>
              <Link to="/login">Login</Link>
            </li> */}
            <CartLink />
            <LoginLink />
          </div>
        </ul>
      </nav>
    </header>
  );
}
