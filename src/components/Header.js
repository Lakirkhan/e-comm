import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { productSearch } from "../redux/productAction";


const Header = () => {
  const result = useSelector((state) => state.cartData);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <Link to="/">
            <img src="../images/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(event) => dispatch(productSearch(event.target.value))}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="nav-right">
        <Link to="/cart">
          <div className="nav-cart">
            <span className="cart-count">{result.length}</span>
            <span>Cart</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;




