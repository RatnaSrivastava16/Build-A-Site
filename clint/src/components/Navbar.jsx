import React from "react";
import "./Navbar.css"
const Navbar = ({ onNavClick }) => {
    return (
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>Prodify</h1>
        <ul style={styles.navItems}>
            <li onClick={() => onNavClick('Home')} style={styles.navItem}>
            Home
          </li>
          <li onClick={() => onNavClick('Timer')} style={styles.navItem}>
            Timer
          </li>
          <li onClick={() => onNavClick('Manage')} style={styles.navItem}>
            Manage
          </li>
          <li onClick={() => onNavClick('Progress')} style={styles.navItem}>
            Progress
          </li>
          <li onClick={() => onNavClick('User')} style={styles.navItem}>
          <span className="material-symbols-outlined">person</span>
          </li>
        </ul>
      </nav>
    );
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#282c34',
      color: '#ffffff',
    },
    logo: {
      fontSize: '1.5rem',
    },
    navItems: {
      listStyle: 'none',
      display: 'flex',
      gap: '2rem',
    },
    navItem: {
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'color 0.2s',
    },
  };
  

export default Navbar