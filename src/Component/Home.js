import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./api";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Online Shop"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-xs-10 col-sm-6 col-md-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
