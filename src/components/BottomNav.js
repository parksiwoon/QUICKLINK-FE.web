// BottomNav.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";

function BottomNav() {
  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navItem}>
        홈
      </Link>
      <Link to="/chat" className={styles.navItem}>
        Chat
      </Link>
      <Link to="/notifications" className={styles.navItem}>
        Alarm
      </Link>
      <Link to="/me" className={styles.navItem}>
        Me
      </Link>
    </nav>
  );
}

export default BottomNav;
