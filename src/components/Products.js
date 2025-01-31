import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductList } from "../redux/action";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";
import Footer from "./Footer";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productData);
  const cart = useSelector((state) => state.cartData);
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProductList());
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  // Sorting logic
  const sortedProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0;
    });

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleAddToCart = (product) => {
    if (!isInCart(product.id)) {
      dispatch(addToCart(product));
    }
  };

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      {error && <p className="error">Error: {error}</p>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="main-container">
          <h2>Product Listing</h2>

          {/* Search and Filter Section */}
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-rating">
                    ⭐ {product.rating.rate} ({product.rating.count} reviews)
                  </p>

                  <div className="button-container">
                    {isInCart(product.id) ? (
                      <p className="product-in-cart-msg">
                        Product is already in cart
                      </p>
                    ) : (
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}

                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">No products found.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Products;
