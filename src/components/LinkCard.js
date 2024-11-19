import React from "react";
import Card from "../components/Card";
import Link from "../components/Link";
import styles from "./LinkCard.module.css";
import OGDefaultImage from "../assets/og-default.png";
import XCircleImage from "../assets/x-circle.svg";

function highlightText(text, searchTerm) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi"); // 검색어 강조
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} className={styles.highlight}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

function LinkCard({ thumbUrl, title, url, onClick, onDelete, searchTerm }) {
  function handleLinkClick(e) {
    e.stopPropagation();
  }

  function handleDelete(e) {
    e.stopPropagation();
    onDelete();
  }

  return (
    <Card
      className={`${styles.LinkCard} ${onClick ? styles.editable : ""}`}
      onClick={onClick}
    >
      <img
        className={styles.Thumbnail}
        src={thumbUrl ?? OGDefaultImage}
        alt="썸네일 이미지"
      />
      <div className={styles.Container}>
        <div className={styles.LinkTitle}>
          {highlightText(title, searchTerm)} {/* 제목 강조 */}
        </div>
        <Link
          className={styles.LinkUrl}
          appearance="secondary"
          to={url}
          target="_blank"
          onClick={handleLinkClick}
        >
          {highlightText(url, searchTerm)} {/* 제목 강조 */}
        </Link>
      </div>
      {onDelete && (
        <img
          className={styles.LinkDelete}
          src={XCircleImage}
          alt="삭제 아이콘"
          onClick={handleDelete}
        />
      )}
    </Card>
  );
}

export default LinkCard;
