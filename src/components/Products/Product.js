import React from "react";
import { Link } from "react-router-dom";

// initiating prop types //impt is the snippet used
import PropTypes from "prop-types";

// import default images
import img from "../../assets/mainBcg.jpg";

export default function Product({ image, title, id, price }) {
  return (
    <article className="product">
      <div className="img-container">
        <img src={image || img} alt={title || "Default title"} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          Details
        </Link>
      </div>

      {/* footer */}
      <div className="product-footer">
        <p className="product-title">{title || "default title"}</p>
        <p className="product-price">GHC {price || 0}</p>
      </div>
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};
