import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./api";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    tags: [],
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    tags,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("U", data);

        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          tags: data.tags,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          tags: [],
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setValues({ ...values, tags: [...values.tags, e.target.value] });
        e.target.value = "";
      }
    }
  };
  const removeTag = (removedTag) => {
    const newTags = tags.filter((el) => el !== removedTag);

    setValues({ ...values, tags: newTags });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    formData.set("tags", tags);
    updateProduct(match.params.productId, formData).then((data) => {
      if (data.hasOwnProperty("error")) {
        setValues({ ...values, error: "Fill all the details" });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          tags: [],
          loading: false,
          error: "",
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary col-12 col-sm-8 col-lg-6">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

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
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange("category")}
          required
          className="form-control"
        >
          <option value="">Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          onChange={handleChange("shipping")}
          required
          className="form-control"
        >
          <option value="">Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
          required
        />
      </div>

      <div className="form-group tag-container">
        <label className="text-muted">Tags</label>
        <input className="form-control" onKeyDown={(e) => addTag(e)} />
        {tags.map((tagElement, index) => {
          return (
            <div key={index} className="tag">
              {tagElement} <span onClick={() => removeTag(tagElement)}>x</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={clickSubmit}
        className="btn btn-outline-primary"
      >
        Update Product
      </button>
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is updated!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Update product"
      description={`G'day , ready to update product?`}
    >
      <div className="row">
        <div className="col-8 col-lg-6 offset-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
