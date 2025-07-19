import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#2c3e50',
      color: 'white',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
    },
    menuButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    drawer: {
      position: 'fixed',
      top: 0,
      right: isDrawerOpen ? 0 : '-300px',
      width: '300px',
      height: '100vh',
      backgroundColor: '#34495e',
      transition: 'right 0.3s ease',
      padding: '2rem',
      boxShadow: '-5px 0 15px rgba(0,0,0,0.2)',
      zIndex: 999,
    },
    navItem: {
      padding: '0.75rem 0',
      borderBottom: '1px solid #2c3e50',
      cursor: 'pointer',
      color: 'white',
      transition: 'color 0.2s ease',
    },
    navItemHover: {
      color: '#3498db',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    logoutButton: {
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '2rem',
      width: '100%',
      transition: 'background 0.2s ease',
    },
    logoutButtonHover: {
      background: '#c0392b',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 998,
      display: isDrawerOpen ? 'block' : 'none',
    },
    appTitle: {
      cursor: 'pointer',
    }
  };

  // Combined hover styles
  const navItemStyle = {
    ...styles.navItem,
    ':hover': styles.navItemHover
  };

  const logoutButtonStyle = {
    ...styles.logoutButton,
    ':hover': styles.logoutButtonHover
  };

  return (
    <>
      <nav style={styles.navbar}>
        <button style={styles.menuButton} onClick={toggleDrawer}>
          ☰
        </button>
        <h1 style={styles.appTitle} onClick={() => navigate('/')}>MedDetect</h1>
      </nav>

      {/* Overlay */}
      <div style={styles.overlay} onClick={toggleDrawer} />

      {/* Drawer */}
      <div style={styles.drawer}>
        <button style={styles.closeButton} onClick={toggleDrawer}>
          ×
        </button>
        <h2>Menu</h2>
        
        <div 
          style={navItemStyle} 
          onClick={() => handleNavigation('/risk-prediction')}
          onMouseEnter={(e) => e.currentTarget.style.color = styles.navItemHover.color}
          onMouseLeave={(e) => e.currentTarget.style.color = styles.navItem.color}
        >
          Risk Prediction
        </div>
        
        <div 
          style={navItemStyle} 
          onClick={() => handleNavigation('/prescription-validation')}
          onMouseEnter={(e) => e.currentTarget.style.color = styles.navItemHover.color}
          onMouseLeave={(e) => e.currentTarget.style.color = styles.navItem.color}
        >
          Prescription Validation
        </div>

        <button 
          style={logoutButtonStyle}
          onClick={() => handleNavigation('/login')}
          onMouseEnter={(e) => e.currentTarget.style.background = styles.logoutButtonHover.background}
          onMouseLeave={(e) => e.currentTarget.style.background = styles.logoutButton.background}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;