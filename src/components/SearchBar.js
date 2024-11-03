import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        placeholder="Type your text"
        required
        type="text"
      />
      <span className={styles.inputBorder}></span>
    </div>
  );
}

export default SearchBar;
