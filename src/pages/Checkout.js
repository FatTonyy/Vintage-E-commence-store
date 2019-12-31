import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";

// react stripe elements
import SubmitOrder from "../strapi/submitOrder";

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { showAlert, user, hideAlert, alert } = React.useContext(UserContext);
  const history = useHistory();

  // state values
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: "submitting order...please wait" });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch(error => console.log(error));

    console.log(response);

    const { token } = response;
    if (token) {
      console.log(response);
    } else {
      hideAlert();
      setError(response.error.message);
    }
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
            id="name"
            value={name}
            onChange={e => {
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
        <CardElement className="card-element"></CardElement>
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

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_GhUvjXT1OwuJyPq3RmqamOLg00mURpQXos">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
