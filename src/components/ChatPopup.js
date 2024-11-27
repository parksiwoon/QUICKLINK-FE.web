import React, { useState } from "react";
import axios from "../lib/axios"; // Axios 인스턴스
import commonStyles from "./Popup.module.css"; // Popup 공통 스타일
import chatStyles from "./ChatPopup.module.css"; // Chat-specific 스타일

function ChatPopup({ onClose }) {
  const [messages, setMessages] = useState([]); // 채팅 메시지 저장
  const [inputValue, setInputValue] = useState(""); // 입력 필드 값
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 메시지 전송 및 API 호출
  const handleSend = async () => {
    if (!inputValue.trim()) return; // 빈 입력 방지

    // 사용자 메시지 추가
    const userMessage = {
      sender: "사용자",
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // 입력 필드 초기화
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("토큰이 없습니다.");

      // API 요청 보내기
      const response = await axios.post(
        "/recommend/links",
        { request: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
        }
      );

      const recommendations = response.data.result; // API 응답 결과
      const aiMessage = {
        sender: "AI",
        text: "다음 사이트들을 추천합니다:",
        recommendations, // 추천 사이트 리스트 포함
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API 호출 실패:", error);
      const errorMessage = {
        sender: "AI",
        text: "추천 사이트를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <div className={commonStyles.overlay}>
      <div className={commonStyles.popup}>
        <button className={commonStyles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={chatStyles.chatContainer}>
          {/* 채팅 메시지 렌더링 */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${chatStyles.chatBubble} ${
                message.sender === "사용자"
                  ? chatStyles.userBubble
                  : chatStyles.aiBubble
              }`}
            >
              <div className={chatStyles.sender}>{message.sender}</div>
              <p className={chatStyles.message}>{message.text}</p>

              {/* AI 추천 메시지에 추천 링크 추가 */}
              {message.recommendations &&
                message.recommendations.map((rec, idx) => (
                  <div key={idx} className={chatStyles.recommendation}>
                    {/* 사이트 이름 */}
                    <a
                      href={rec.url}
                      target="_blank" // 새 탭에서 열기
                      rel="noopener noreferrer" // 보안 속성 추가
                      className={chatStyles.recommendationLink}
                    >
                      {rec.siteName}
                    </a>
                    <p>{rec.description}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* 메시지 입력 */}
        <div className={chatStyles.inputContainer}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className={chatStyles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // 입력 필드 값 업데이트
          />
          <button
            className={chatStyles.sendButton}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "전송 중..." : "전송"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
