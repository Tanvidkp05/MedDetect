import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const RiskPrediction = () => {
  const navigate = useNavigate();

  const riskOptions = [
    { id: 1, title: "Heart Disease", icon: "❤️", path: "heart-disease" },
    { id: 2, title: "PCOS", icon: "🌸", path: "pcos" },
    { id: 3, title: "Diabetes", icon: "🩸", path: "diabetes" },
    { id: 4, title: "Hypertension", icon: "💓", path: "predict/hypertension" }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Segoe UI, sans-serif' }}>
      <Navbar />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        paddingTop: '100px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.8rem',
          fontWeight: 600,
          color: '#1e293b',
          marginBottom: '40px'
        }}>
          Health Risk Assessment
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {riskOptions.map(option => (
            <div
              key={option.id}
              onClick={() => navigate(`/${option.path}`)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '36px 24px',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                transform: 'scale(1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.querySelector('.icon').style.transform = 'scale(1.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.querySelector('.icon').style.transform = 'scale(1)';
              }}
            >
              <div className="icon" style={{
                fontSize: '3rem',
                transition: 'transform 0.3s ease'
              }}>
                {option.icon}
              </div>
              <h3 style={{
                fontSize: '1.6rem',
                color: '#0f172a',
                marginTop: '20px',
                marginBottom: '10px',
                fontWeight: 600
              }}>
                {option.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Click to assess your risk and get personalized suggestions.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskPrediction;