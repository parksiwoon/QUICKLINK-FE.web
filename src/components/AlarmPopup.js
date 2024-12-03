import React from "react";
import commonStyles from "./Popup.module.css"; // 공통 스타일
import styles from "./AlarmPopupCard.module.css"; // 알람 카드 스타일
import AlarmPopupCard from "./AlarmPopupCard";

function AlarmPopup({ notifications, onClose }) {
  return (
    <div className={commonStyles.overlay}>
      <div className={commonStyles.popup}>
        <button className={commonStyles.closeButton} onClick={onClose}>
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
