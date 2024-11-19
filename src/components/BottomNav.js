import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./BottomNav.module.css";
import { useAuth } from "../contexts/AuthProvider";
import ChatPopup from "./ChatPopup";
import AlarmPopup from "./AlarmPopup";

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("/me");
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);
  const [isAlarmPopupOpen, setIsAlarmPopupOpen] = useState(false);

  const openChatPopup = () => {
    setIsChatPopupOpen(true);
    setActiveTab("/chat"); // Chat 탭 활성화
  };

  const closeChatPopup = () => {
    setIsChatPopupOpen(false);
    setActiveTab("/me"); // 팝업 닫힐 때 기본 탭 활성화
  };

  const openAlarmPopup = () => {
    setIsAlarmPopupOpen(true);
    setActiveTab("/notifications"); // Alarm 탭 활성화
  };

  const closeAlarmPopup = () => {
    setIsAlarmPopupOpen(false);
    setActiveTab("/me");
  };

  // 라우팅 상태에 따라 탭 활성화
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab(""); // 루트 경로에서는 아무 탭도 활성화하지 않음
    } else if (
      location.pathname === "/me/info" ||
      location.pathname === "/me/info/edit"
    ) {
      setActiveTab("/me/info");
    } else {
      setActiveTab("/me"); // 기본 경로
    }
  }, [location.pathname]);

  // 인증 상태 체크 후 리다이렉트
  function handleNavigation(targetPath) {
    if (!user && (targetPath === "/me" || targetPath.startsWith("/me/info"))) {
      navigate("/login");
    } else {
      navigate(targetPath);
    }
  }

  return (
    <>
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
              home
            </Link>
          </label>

          <input
            type="radio"
            id="radio-2"
            name="tabs"
            checked={activeTab === "/chat"}
            readOnly
          />
          <label
            className={styles.tab}
            htmlFor="radio-2"
            onClick={openChatPopup} // Chat 클릭 시 팝업 열기
          >
            Chat
          </label>

          <input
            type="radio"
            id="radio-3"
            name="tabs"
            checked={activeTab === "/notifications"}
            readOnly
          />
          <label
            className={styles.tab}
            htmlFor="radio-3"
            onClick={openAlarmPopup} // Alarm 클릭 시 팝업 열기
          >
            Alarm
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
      {/* Chat 팝업 렌더링 */}
      {isChatPopupOpen && <ChatPopup onClose={closeChatPopup} />}

      {/* Alarm 팝업 렌더링 */}
      {isAlarmPopupOpen && <AlarmPopup onClose={closeAlarmPopup} />}
    </>
  );
}

export default BottomNav;
