import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";

// react stripe elements
import SubmitOrder from "../strapi/submitOrder";

export default function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { showAlert, user, hideAlert, alert } = React.useContext(UserContext);
  const history = useHistory();

  // state values
  const { name, setName } = React.useState("");
  const { error, setError } = React.useState("");
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    e.preventDefault();
  }

  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>
          order total : <span>GHC {total}</span>
        </h3>

        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            value={name}
            onchange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* end of single input */}

        {/* card elements */}
        <div className="stripe-input">
          <label htmlFor="card-element">credit card or debit card</label>
          <p className="stripe-info">
            test using this credit card : <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for thr zip code
            <br />
            enter any 3 digits for cvc
          </p>
        </div>
        {/* card elements */}

        {/* stripe elements */}
        {/* end of stripe elements */}

        {/* stripe errors */}
        {error && <p className="form-empty">{error}</p>}

        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">please fill out name filed</p>
        ) : (
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
}
