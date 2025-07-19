import React from 'react';
import Navbar from '../layout/Navbar';
import './Home.css'; // We'll create this CSS file

const Home = () => {
  const features = [
    {
      title: "Patient Analytics",
      description: "Real-time health monitoring and trend analysis",
      emoji: "📊",
      color: "#3b82f6"
    },
    {
      title: "Risk Prediction",
      description: "AI-powered disease risk assessment",
      emoji: "⚠️",
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
        {/* Hero Section */}
        <div className="dashboard-hero">
          <h1>Welcome to <span className="brand-name">MedDetect</span></h1>
          <p>Your intelligent healthcare companion for advanced diagnostics</p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              style={{ background: `linear-gradient(135deg, ${feature.color}, ${darkenColor(feature.color, 20)})` }}
            >
              <span className="feature-emoji">{feature.emoji}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
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

// Helper function to darken colors for gradients
function darkenColor(color, percent) {
  // Simplified color manipulation (in a real app, use a library)
  return color; // Replace with actual color manipulation
}

export default Home;