import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { faFolder, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useMemo, useState } from "react";
import ProductForm from "../ProductForm/ProductForm";
import { AuthContext } from "../../Context/AuthContext";
import ProductCard from "../ProductCard/ProductCard";
import { ProductsContext } from "../../Context/ProductsContext";
import toast from "react-hot-toast";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(ProductsContext);
  const categories = ["all", "mobile", "laptop", "tv", "watch", "tablet"];
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [filterCat, setFilterCat] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "all" || p.category === filterCat;
      return matchSearch && matchCat;
    });
  },[products,search, filterCat]);

  const averagePrice = products.length
    ? Math.round(products.reduce((sum, p) => sum + Number(p.price), 0) / products.length)
    : 0;

  const handleSubmit = (data) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
      toast.success("Product updated");
      setEditProduct(null);
    } else {
      addProduct(data);
      toast.success("Product added");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(id);
      toast.success("Product deleted");
    }
  };

  const handleCancel = () => {
    setEditProduct(null);
  };

  return (
    <>
      <div className="home-page">
        <div className="bg-mesh"></div>
        <div className="home-inner">
          <div className="welcome-strip fade-up">
            <div>
              <h1 className="page-title">Dashboard Products</h1>
              <p className="page-sub">
                Welcome, <strong>{currentUser?.name}</strong> - Manage Your
                Products With ease
              </p>
            </div>
            <div className="stats-row">
              <div className="stat-chip">
                <span className="stat-num">{products.length}</span>
                <span className="stat-lbl">Products</span>
              </div>
              <div className="stat-chip stat-chip--green">
                <span className="stat-num">{averagePrice.toLocaleString()}</span>
                <span className="stat-lbl">Average Price</span>
              </div>
            </div>
          </div>
          <div className="home-layout">
            <aside className="form-sidebar fade-up stagger-1">
              <button
                className="btn btn-outline btn-sm toggle-form-btn"
                onClick={() => setShowForm((p) => !p)}
              >
                {showForm ? "Hide the form" : "Show the form"}
              </button>
              {showForm && (
                <ProductForm
                  key={editProduct?.id ?? "new"}
                  onSubmit={handleSubmit}
                  editProduct={editProduct}
                  onCancel={handleCancel}
                />
              )}
            </aside>
            <div className="products-main">
              <div className="toolbar fade-up stagger-2">
                <div className="search-wrap">
                  <span className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input
                    type="search"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    className="form-control search-input"
                    placeholder="Search by product name or description"
                  />
                  {search && (
                    <button
                      className="search-clear"
                      onClick={() => setSearch("")}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  )}
                </div>
                <div className="filter-tabs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`filter-tab ${filterCat === cat ? "active" : ""}`}
                      onClick={() => setFilterCat(cat)}
                    >
                      {cat === "all" ? "all" : cat}
                    </button>
                  ))}
                </div>
              </div>
              {filtered.length === 0 ? (
                <>
                  <div className="empty-state fade-up">
                    <div className="empty-icon">
                      <FontAwesomeIcon icon={faFolder} />
                    </div>
                    <h3>
                      {products.length === 0
                        ? "Not Exist Products"
                        : "Not Results"}
                    </h3>
                    <p>
                      {products.length === 0
                        ? "Add First Product From Form"
                        : "Search Product"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="products-grid">
                    {filtered.map((p, i) => (
                      <div key={p.id} style={{ animationDelay: `${Math.min(i, 8) * 0.06}s` }}>
                        <ProductCard
                          product={p}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
