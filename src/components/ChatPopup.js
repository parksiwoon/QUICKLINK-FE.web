import React from "react";
import styles from "./Popup.module.css"; // Popup 스타일 공통 사용

function ChatPopup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className="card">
          <div className="background"></div>
          <div className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29.667 31.69"
              className="logo-svg"
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className="box box1">
            <span className="icon">Icon 1</span>
          </div>
          <div className="box box2">
            <span className="icon">Icon 2</span>
          </div>
          <div className="box box3">
            <span className="icon">Icon 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
