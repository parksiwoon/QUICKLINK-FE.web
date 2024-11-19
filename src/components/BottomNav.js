import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BottomNav.module.css";

function BottomNav() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/me");

  // 라우팅 상태에 따라 탭 활성화
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab(""); // 루트 경로에서는 아무 탭도 활성화하지 않음
    } else if (
      location.pathname === "/me/info" ||
      location.pathname === "/me/info/edit"
    ) {
      setActiveTab("/me/info");
    } else if (location.pathname.startsWith("/chat")) {
      setActiveTab("/chat");
    } else if (location.pathname.startsWith("/notifications")) {
      setActiveTab("/notifications");
    } else {
      setActiveTab("/me"); // 기본 경로
    }
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          checked={activeTab === "/me"}
          readOnly
        />
        <label className={styles.tab} htmlFor="radio-1">
          <Link to="/me" className={styles.navLink}>
            홈
          </Link>
        </label>

        <input
          type="radio"
          id="radio-2"
          name="tabs"
          checked={activeTab === "/chat"}
          readOnly
        />
        <label className={styles.tab} htmlFor="radio-2">
          <Link to="/chat" className={styles.navLink}>
            Chat
          </Link>
        </label>

        <input
          type="radio"
          id="radio-3"
          name="tabs"
          checked={activeTab === "/notifications"}
          readOnly
        />
        <label className={styles.tab} htmlFor="radio-3">
          <Link to="/notifications" className={styles.navLink}>
            Alarm
          </Link>
          <span className={styles.notification}>2</span>
        </label>

        <input
          type="radio"
          id="radio-4"
          name="tabs"
          checked={activeTab.startsWith("/me/info")}
          readOnly
        />
        <label className={styles.tab} htmlFor="radio-4">
          <Link to="/me/info" className={styles.navLink}>
            Me
          </Link>
        </label>

        {/* 루트 경로에서는 glider가 보이지 않도록 조건 추가 */}
        {activeTab && <span className={styles.glider}></span>}
      </div>
    </div>
  );
}

export default BottomNav;
