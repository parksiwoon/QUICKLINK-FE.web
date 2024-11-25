import React from "react";
import commonStyles from "./Popup.module.css"; // Popup 공통 스타일
import chatStyles from "./ChatPopup.module.css"; // Chat-specific 스타일

function ChatPopup({ onClose }) {
  return (
    <div className={commonStyles.overlay}>
      <div className={commonStyles.popup}>
        <button className={commonStyles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={chatStyles.chatContainer}>
          {/* 사용자 메시지 */}
          <div className={`${chatStyles.chatBubble} ${chatStyles.userBubble}`}>
            <div className={chatStyles.sender}>사용자</div>
            <p className={chatStyles.message}>
              웹 개발에 필요한 정보들을 어디서 얻을 수 있을까? 간단하게 채팅
              컴포넌트를 제작하고 싶은데
            </p>
          </div>

          {/* AI 메시지 */}
          <div className={`${chatStyles.chatBubble} ${chatStyles.aiBubble}`}>
            <div className={chatStyles.sender}>AI</div>
            <p className={chatStyles.message}>
              웹 개발 정보는 MDN 웹 문서나 개발자들이 자주 이용하는
              StackOverflow에서 찾을 수 있어요!
            </p>
          </div>
        </div>

        {/* 메시지 입력 */}
        <div className={chatStyles.inputContainer}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className={chatStyles.chatInput}
          />
          <button className={chatStyles.sendButton}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
