import React from "react";
import styles from "./Popup.module.css"; // 팝업 공통 스타일
import AlarmPopupCard from "./AlarmPopupCard"; // 카드 컴포넌트 임포트

function AlarmPopup({ notifications, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.notificationList}>
          {notifications.map((notification, index) => (
            <AlarmPopupCard
              key={index}
              title={notification.title}
              url={notification.url}
              date={notification.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlarmPopup;
