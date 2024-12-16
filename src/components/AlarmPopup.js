import React, { useState, useEffect } from "react";
import commonStyles from "./Popup.module.css";
import styles from "./AlarmPopupCard.module.css";
import AlarmPopupCard from "./AlarmPopupCard";
import RegisterRSS from "./RegisterRSS";
import axios from "../lib/axios";

function AlarmPopup({ onClose }) {
  const [notifications, setNotifications] = useState([]);

  // 알림 데이터 가져오는 함수
  const getNotifications = async () => {
    try {
      const response = await axios.get("/notification"); // 올바른 알림 API 엔드포인트 사용
      setNotifications(response.data.result);
    } catch (error) {
      console.error("알림 데이터를 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className={commonStyles.overlay}>
      <div className={commonStyles.popup}>
        <button className={commonStyles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* RegisterRSS 컴포넌트 삽입 */}
        <RegisterRSS onRegisterSuccess={getNotifications} />

        {/* 알림 목록 */}
        <div className={styles.notificationList}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <AlarmPopupCard
                key={notification.id}
                message={notification.message}
                createdAt={notification.createdAt}
              />
            ))
          ) : (
            <p className={styles.noNotification}>알림이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlarmPopup;
