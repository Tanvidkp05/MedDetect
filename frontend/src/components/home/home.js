import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './Home.css';
import analysis1 from '../analysis1';

const Home = () => {
  const features = [
    {
      title: "Patient Analytics",
      description: "Real-time health monitoring",
      emoji: "📊",
      color: "#3b82f6"
    },
    {
      title: "Risk Prediction",
      description: "AI-powered disease risk assessment",
      emoji: "⚠",
      color: "#f59e0b"
    },
    {
      title: "Prescription Validation",
      description: "Medication safety and interaction checks",
      emoji: "💊",
      color: "#10b981"
    }
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dashboard-main">
        <div className="dashboard-hero">
          <h1>Welcome to <span className="brand-name">MedDetect</span></h1>
          <p>Your intelligent healthcare companion for advanced diagnostics</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const cardContent = (
              <div
                className="feature-card"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}, ${darkenColor(feature.color, 20)})`
                }}
              >
                <span className="feature-emoji">{feature.emoji}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );

            return (
              <div key={index} className="feature-wrapper">
                {feature.title === "Risk Prediction" ? (
                  <Link to="/risk-prediction" className="feature-link">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>

        <div className="activity-card">
          <div className="activity-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="activity-content">
                  <p className="activity-title">New analysis completed</p>
                  <p className="activity-time">30 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Dummy color manipulation
function darkenColor(color, percent) {
  return color; // You can replace with a library like polished for real darkening
}

export default Home;