import React from "react";
import styles from "./AlarmPopup.module.css"; // 스타일 파일 작성

function AlarmPopup({ notifications, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.notificationList}>
          {notifications.map((notification, index) => (
            <div className="card" key={index}>
              <div className="img"></div>
              <div className="textBox">
                <div className="textContent">
                  <p className="h1">{notification.title}</p>
                  <span className="span">{notification.date}</span>
                </div>
                <p className="p">{notification.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlarmPopup;
