import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { createCategory, getCategories } from "./api";

const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    categories: [],
    super_category: "",
    loading: false,
    error: "",
    createdcategory: "",
    formData: "",
  });

  const {
    name,
    categories,
    super_category,
    loading,
    error,
    createdcategory,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log(values);
    createCategory(formData).then((data) => {
      console.log("Data", data);
      if (data.error) {
        console.log("Error", data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          loading: false,
          createdcategory: data.name,
        });
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Super Category</label>
        <select
          onChange={handleChange("super_category")}
          className="form-control"
        >
          <option>Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdcategory ? "" : "none" }}
    >
      <h2>{`${createdcategory}`} is created!</h2>
    </div>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day , ready to add a new category?`}
    >
      <div className="row">
        <div className="col-8 col-lg-6 offset-2">
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
