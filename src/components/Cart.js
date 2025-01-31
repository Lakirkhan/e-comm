import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, emptyCart } from "../redux/action";
import "../styles/Cart.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartData);
  const [coupon, setCoupon] = useState("");
  const navigation = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = totalAmount * 0.1;
  const finalAmount = totalAmount - discount;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleViewDetail = (id) => {
    navigation(`/product/${id}`);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };

  const handleCheckout = () => {
    navigation("/checkout");
  };

  return (
    <div>
    <div className="cart-container">
      {/* Subtotal and Proceed to Checkout Header */}
      <div className="cart-header">
        <p>
          FinalAmount ({cartItems.length} items): <strong>${finalAmount.toFixed(2)}</strong>
        </p>
        <button className="proceed-to-checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>

      <h2>Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="item-info">
                        <img src={item.image} alt={item.title} className="cart-img" />
                        <div>
                          <p>{item.title}</p>
                          <button
                            className="view-specs-btn"
                            onClick={() => handleViewDetail(item.id)}
                          >
                            View full specs
                          </button>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="cart-summary">
          <div className="pricing">
            <p>Total Savings: <span>${discount.toFixed(2)}</span></p>
            <p>Subtotal ({cartItems.length} Item): <span>${totalAmount.toFixed(2)}</span></p>
            <p>Estimated Tax: <span>$0.00</span></p>
            <p>Final Amount: <span>${finalAmount.toFixed(2)}</span></p>
          </div>
          <div className="checkout-options">
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            <button className="checkout-financing-btn">Checkout with Financing</button>
          </div>
        </div>
      </div>
    </div>
      <Footer />
      </div>
  );
};

export default Cart;
