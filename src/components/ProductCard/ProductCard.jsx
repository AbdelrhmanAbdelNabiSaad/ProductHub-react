import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductCard.css";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import laptop from "../../assets/laptop.jpg";
import mobile from '../../assets/mobile.png';
import tablet from '../../assets/tablet.jpeg';
import watch from '../../assets/watch.png';
import tv from '../../assets/tv.jpeg'
const category_icons = {
  mobile: mobile,
  laptop: laptop,
  tv: tv,
  watch: watch,
  tablet: tablet,
};



export default function ProductCard({ product, onDelete, onEdit }) {
    const icon = category_icons[product.category] || "📦";
  return (
    <>
      <div className="product-card fade-up">
        <div className="card-image">
          <img src={icon} alt="Laptopn Image" />
        </div>
        <div className="card-body">
          <h3 className="card-name">{product.name}</h3>
          <div
            className="card-category-badge"
          >
            {product.category}
          </div>
          <p className="card-desc">{product.description}</p>
          <div className="card-price">
            <span className="price-label">Price</span>
            <div className="price-value">
              {Number(product.price).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="btn btn-outline btn-sm card-btn"
            onClick={() => onEdit(product)}
          >
            Update
          </button>
          <button
            className="btn btn-danger btn-sm card-btn"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
