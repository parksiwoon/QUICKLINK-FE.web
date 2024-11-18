import React from "react";
import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";

function BottomNav() {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input type="radio" id="radio-1" name="tabs" defaultChecked />
        <label className={styles.tab} htmlFor="radio-1">
          <Link to="/" className={styles.navLink}>
            홈
          </Link>
        </label>

        <input type="radio" id="radio-2" name="tabs" />
        <label className={styles.tab} htmlFor="radio-2">
          <Link to="/chat" className={styles.navLink}>
            Chat
          </Link>
        </label>

        <input type="radio" id="radio-3" name="tabs" />
        <label className={styles.tab} htmlFor="radio-3">
          <Link to="/notifications" className={styles.navLink}>
            Alarm
          </Link>
          <span className={styles.notification}>2</span>
        </label>

        <input type="radio" id="radio-4" name="tabs" />
        <label className={styles.tab} htmlFor="radio-4">
          <Link to="/me" className={styles.navLink}>
            Me
          </Link>
        </label>

        <span className={styles.glider}></span>
      </div>
    </div>
  );
}

export default BottomNav;
