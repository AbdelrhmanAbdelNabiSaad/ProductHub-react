import { useEffect, useState } from "react";
import "./ProductForm.css";
import { validateField } from "../../utils/validation";
import { error } from "generate-react-cli/src/utils/messagesUtils";

export default function ProductForm({ onSubmit, editProduct, onCancel }) {
  const categories = ["mobile", "laptop", "tv", "watch", "tablet"];
  const empty = { name: "", price: "", category: "", description: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const isEditing = !!editProduct;

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price,
        category: editProduct.category,
        description: editProduct.description,
      })
      setErrors({});
    } else {
      setForm(empty);
      setErrors({});
    }
  }, [editProduct])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((k) => {
      const err = validateField(k, form[k]);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSubmit(form);
    if (!isEditing) {
      setForm(empty);
      setErrors({});
    }
  };

  const fieldClass = (name) =>
    `form-control ${errors[name] ? "is-invalid" : form[name] ? "is-valid" : ""}`;

  return (
    <>
      <form action="#" className="product-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2 className="form-title">
            {isEditing ? "Update Product" : "Add New Product"}
          </h2>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className={fieldClass("name")}
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Product Price
            </label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              className={fieldClass("price")}
              id="price"
              placeholder="Product Price"
            />
            {errors.price && <span className="form-error">{errors.price}</span>}
          </div>
        </div>
        <div className="form-group mt-20">
          <label htmlFor="category" className="form-label">
            Product Category
          </label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className={fieldClass("category")}
          >
            <option value="" hidden>
              Choose Product Category...
            </option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="form-error">{errors.category}</span>
          )}
        </div>
        <div className="form-group form-group--full mt-20">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={fieldClass("description")}
            placeholder="write product description (minlength 30 letter)"
            id="description"
          ></textarea>
          <div
            className="char-count"
            style={{
              color:
                form.description.length >= 30
                  ? "var(--success)"
                  : "var(--text-muted)",
            }}
          >
            {form.description.length} / 30+
          </div>
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className={`btn btn-sm ${isEditing ? "btn-warning" : "btn-primary"}`}
          >
            {isEditing ? "Update Prodcut" : "Add Product"}
          </button>
          {isEditing && (
            <button className="btn btn-danger btn-sm" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
}
