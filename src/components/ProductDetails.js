import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/action";
import "../styles/ProductDetails.css";
import Footer from "./Footer";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartData);
  const { id } = useParams();
  const allProducts = useSelector((state) => state.productData);
  const product = allProducts.find((item) => item.id === Number(id));

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const handleAddToCart = (product) => {
    if (!isInCart(product.id)) {
      dispatch(addToCart(product));
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  // If product is not found, return an early UI
  if (!product) {
    return <h2 className="not-found">Product not found</h2>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortDescription = product.description.slice(0, 100);

  // Get related products from the same category (excluding the current product)
  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 5);

  // Get recommended products based on category (can be adjusted to include other conditions like tags, etc.)
  const recommendedProducts = allProducts
    .filter((item) => {
      // Logic for recommending products (e.g., accessories for a shirt)
      if (product.category === "Shirts") {
        return ["Pants", "Belts", "Rings"].includes(item.category);
      }
      // You can extend this logic for other categories
      return item.category !== product.category && item.category !== "Shirts";
    })
    .slice(0, 5); // Limit to 5 products

  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; 
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div>
      <div className="product-page">
        {/* Product Details Section */}
        <div className="product-container">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            <h4 className="product-category">Category: {product.category}</h4>
            <p className="product-description">
              {showFullDescription ? product.description : shortDescription + "... "}
              <span className="read-more" onClick={toggleDescription}>
                {showFullDescription ? "Read Less" : "Read More"}
              </span>
            </p>
            <p>Rating: <span className="stars">{renderStars(product.rating.rate)}</span> ({product.rating.rate})</p>

            {isInCart(product.id) ? (
              <p className="product-in-cart-msg">Product is already in cart</p>
            ) : (
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Suggested Products Section */}
        <div className="suggested-products">
          <h2>Suggested Products</h2>
          <div className="suggested-products-grid">
            {relatedProducts.map((item) => (
              <div key={item.id} className="suggested-product-card">
                <Link to={`/product/${item.id}`} className="suggested-product-link">
                  <img src={item.image} alt={item.title} className="suggested-product-image" />
                  <h3 className="suggested-product-title">{item.title}</h3>
                  <p className="suggested-product-price">${item.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="recommended-products">
          <h2>Recommended Products</h2>
          <div className="recommended-products-grid">
            {recommendedProducts.map((item) => (
              <div key={item.id} className="recommended-product-card">
                <Link to={`/product/${item.id}`} className="recommended-product-link">
                  <img src={item.image} alt={item.title} className="recommended-product-image" />
                  <h3 className="recommended-product-title">{item.title}</h3>
                  <p className="recommended-product-price">${item.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
