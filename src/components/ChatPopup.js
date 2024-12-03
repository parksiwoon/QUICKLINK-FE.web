import React, { useState } from "react";
import axios from "../lib/axios";
import commonStyles from "./Popup.module.css";
import chatStyles from "./ChatPopup.module.css";

function ChatPopup({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // 추천 사이트를 사용자의 링크로 추가
  const handleAddLink = async (siteName, url) => {
    try {
      await axios.post("/link", { siteName, url }); // 링크 추가 API 호출
      alert(`"${siteName}" 링크가 추가되었습니다.`);
    } catch (error) {
      console.error("링크 추가 실패:", error);
      alert("링크 추가 중 오류가 발생했습니다.");
    }
  };

  // 메시지 전송 및 API 호출
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { sender: "사용자", text: inputValue }]);
    setInputValue("");
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("토큰이 없습니다.");

      const response = await axios.post(
        "/recommend/links",
        { request: inputValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const recommendations = response.data.result;
      recommendations.forEach((rec) => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "AI",
            siteName: rec.siteName,
            description: rec.description,
            url: rec.url,
          },
        ]);
      });
    } catch (error) {
      console.error("API 호출 실패:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "추천 사이트를 가져오는 중 오류가 발생했습니다.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={commonStyles.overlay}>
      <div className={commonStyles.popup}>
        <button className={commonStyles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={chatStyles.chatContainer}>
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
              {message.siteName ? (
                <div>
                  <a
                    href={message.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={chatStyles.recommendationLink}
                  >
                    {message.siteName}
                  </a>
                  <p className={chatStyles.description}>
                    {message.description}
                  </p>
                  <button
                    onClick={() => handleAddLink(message.siteName, message.url)}
                    className={chatStyles.addButton}
                  >
                    ➕ 추가
                  </button>
                </div>
              ) : (
                <p className={chatStyles.message}>{message.text}</p>
              )}
            </div>
          ))}
        </div>
        <div className={chatStyles.inputContainer}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className={chatStyles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
