import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">Rs.{product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>

        <p className="black-7 d-flex flex-row align-items-center flex-wrap p-1">
          <div>Tags:</div>
          {product.tags.map((tag) => {
            return (
              <span class="badge rounded-pill bg-dark text-white ml-2">
                {tag}
              </span>
            );
          })}
        </p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}
      </div>
    </div>
  );
};

export default Card;
