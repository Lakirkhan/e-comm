import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p style={{ wordWrap: 'break-word', maxWidth: '300px' }}>
                        Welcome to E-Comm, your one-stop shop for all your shopping needs. 
                        We provide high-quality products at unbeatable prices.
                    </p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: support@ecomm.com</p>
                    <p>Phone: +1 234 567 890</p>
                    <p>Address: 123 E-Comm Street, Shopping City</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 E-Comm. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
