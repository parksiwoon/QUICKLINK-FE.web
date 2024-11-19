import React from "react";
import styles from "./AlarmPopupCard.module.css"; // 카드 스타일 모듈

function AlarmPopupCard({ title, url, date }) {
  return (
    <div className={styles.card}>
      <div className={styles.img}></div>
      <div className={styles.textBox}>
        <div className={styles.textContent}>
          <p className={styles.h1}>{title}</p>
          <span className={styles.span}>{date}</span>
        </div>
        <p className={styles.p}>{url}</p>
      </div>
    </div>
  );
}

export default AlarmPopupCard;
