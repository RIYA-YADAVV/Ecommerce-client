import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform RU on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12 col-md-8 col-xl-6 offset-md-2 offset-xl-3">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <div className="d-flex flex-column">
                  <Link to={`/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill">
                      Update
                    </span>
                  </Link>
                  <Link>
                    <span
                      onClick={() => destroy(p._id)}
                      className="badge badge-danger badge-pill"
                    >
                      Delete
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
