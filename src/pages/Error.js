import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Uh-OOH! someone is lost</h1>
        <Link to="/" className="btn btn-primary">
          Lets go Home
        </Link>
      </div>
    </section>
  );
}
