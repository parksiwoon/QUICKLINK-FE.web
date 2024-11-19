import React from "react";
import styles from "./ChatPopup.module.css"; // 스타일은 새로 작성

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
              <path
                id="Path_6"
                d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
              ></path>
              <path
                id="Path_7"
                d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
              ></path>
              <path
                id="Path_8"
                d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
              ></path>
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
