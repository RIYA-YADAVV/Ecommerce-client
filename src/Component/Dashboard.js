import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const Links = () => {
    return (
      <div className="card ">
        <h4 className="card-header text-center">Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-center" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-center" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-center" to="/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day Dear`}
      className="container-fluid"
    >
      <div className="row flex justify-content-center">
        <div className="  col-8 col-md-6 col-xl-4">{Links()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
