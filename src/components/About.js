import React, { useState } from "react";
import "../styles/About.css"; // Import custom CSS for styling
import Footer from "./Footer"; // Import the Footer component

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State for team member details toggle

  const toggleDetails = (index) => {
    // Update state to toggle details for the specific team member
    setIsExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  return (
    <div className="about-us-container">
      <div className="hero-section">
        <h1>Who We Are</h1>
        <p>
          We're a passionate team dedicated to creating exceptional experiences
          through our innovative [products/services]. Discover our story and what
          drives us to make a positive impact.
        </p>
      </div>

      <div className="content-section">
        <div className="mission-vision">
          <h2>Our Mission & Vision</h2>
          <p className="mission-statement">
            Our mission is to [clearly state your company's mission, e.g.,
            empower users, revolutionize the industry, etc.]. We strive to
            [describe how you fulfill your mission].
          </p>
          <p className="vision-statement">
            Our vision is to be the [desired position in the industry, e.g.,
            leading innovator, trusted partner, etc.] by [describe how you
            achieve your vision, e.g., delivering cutting-edge solutions,
            fostering long-term relationships].
          </p>
        </div>

        <div className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-members">
            {["John Doe", "Jane Smith", "Emily Johnson"].map((name, index) => (
              <div className="team-card" key={index}>
                <img src={`https://via.placeholder.com/150`} alt={name} />
                <h3>{name}</h3>
                <p>{index === 0 ? "CEO & Founder" : index === 1 ? "Marketing Head" : "Operations Manager"}</p>
                <button
                  onClick={() => toggleDetails(index)}
                  className="details-btn"
                >
                  {isExpanded[index] ? "Hide Details" : "Show More"}
                </button>
                {isExpanded[index] && (
                  <p className="extra-details">
                    {name} is a [brief description of their role and expertise].
                    [Optional: Add a sentence about their passion or contribution
                    to the company].
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;