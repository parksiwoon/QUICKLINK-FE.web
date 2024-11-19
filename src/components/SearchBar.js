import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value); // 입력값이 변경될 때마다 부모에 전달
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 기본 동작 방지
    }
  };

  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        placeholder="검색어를 입력하세요"
        type="text"
        onChange={handleInputChange} // 입력값 변경 시
        onKeyPress={handleKeyPress} // 엔터키 입력 시 기본 동작 방지
      />
      <span className={styles.inputBorder}></span>
    </div>
  );
}

export default SearchBar;
