import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Home from "./Component/Home";
import AddCategory from "./Component/AddCategory";
import AddProduct from "./Component/AddProduct";
import Product from "./Component/Product";
import ManageProducts from "./Component/ManageProducts";
import UpdateProduct from "./Component/UpdateProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/create/category" exact component={AddCategory} />
        <Route path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/products" exact component={ManageProducts} />
        <Route
          path="/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
