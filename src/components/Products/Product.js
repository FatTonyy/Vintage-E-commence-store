import React from "react";
import { Link } from "react-router-dom";

export default function Product({ image, title, id, price }) {
  const url = image.url;
  return (
    <article className="product">
      <div className="img-container">
        <img src={url} alt={title} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          Details
        </Link>
      </div>

      {/* footer */}
      <div className="product-footer">
        <p className="product-title">{title}</p>
        <p className="product-price">GHC {price}</p>
      </div>
    </article>
  );
}
