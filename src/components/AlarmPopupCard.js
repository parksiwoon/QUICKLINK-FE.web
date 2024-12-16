import React from "react";
import styles from "./AlarmPopupCard.module.css";

function AlarmPopupCard({ message, createdAt }) {
  // 날짜 포맷팅 함수
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 6) {
      return "날짜 정보 없음";
    }

    const [year, month, day, hour, minute, second] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);

    // 밀리초가 포함된 경우 처리
    if (dateArray.length === 7) {
      const milliseconds = dateArray[6] / 1000000;
      date.setMilliseconds(milliseconds);
    }

    return date.toLocaleString("ko-KR");
  };

  return (
    <div className={styles.card}>
      <div className={styles.textBox}>
        <p className={styles.message}>{message}</p>
        <span className={styles.date}>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default AlarmPopupCard;
