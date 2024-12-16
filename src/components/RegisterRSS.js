import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import styles from "./RegisterRSS.module.css";

function RegisterRSS({ onRegisterSuccess }) {
  const [rssUrl, setRssUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [rssFeeds, setRssFeeds] = useState([]); // 등록된 RSS 목록 상태

  // 등록된 RSS 목록 가져오는 함수
  const getRssFeeds = async () => {
    try {
      const response = await axios.get("/rss/feeds");
      setRssFeeds(response.data.result);
    } catch (err) {
      console.error(
        "RSS 목록을 불러오는 데 실패했습니다.",
        err.response || err.message
      );
    }
  };

  // RSS URL 등록 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await axios.post("/rss", { rssUrl, title });
      setSuccessMessage("RSS가 성공적으로 등록되었습니다!");
      setRssUrl("");
      setTitle("");
      getRssFeeds(); // 등록 후 RSS 목록 갱신
      if (onRegisterSuccess) onRegisterSuccess(); // 상위 컴포넌트에 성공 알림
    } catch (err) {
      setError("RSS 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // RSS 삭제 함수
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/rss/${id}`);
      getRssFeeds(); // 삭제 후 RSS 목록 갱신
      if (onRegisterSuccess) onRegisterSuccess(); // 상위 컴포넌트에 성공 알림
    } catch (err) {
      setError("RSS 삭제에 실패했습니다.");
    }
  };

  // 컴포넌트가 마운트될 때 RSS 목록 불러오기
  useEffect(() => {
    getRssFeeds();
  }, []);

  return (
    <div className={styles.container}>
      <h2>RSS URL 등록</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          사이트 제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          RSS URL:
          <input
            type="text"
            value={rssUrl}
            onChange={(e) => setRssUrl(e.target.value)}
            required
          />
        </label>

        <p className={styles.infoText}>
          {error && (
            <>
              RSS URL을 모르시나요?{" "}
              <a
                href="https://createfeed.fivefilters.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                CreateFeed
              </a>{" "}
              에서 일반 웹사이트 URL을 입력해 RSS URL을 생성하세요.
            </>
          )}
        </p>

        <button type="submit" className={styles.submitButton}>
          등록하기
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {/* 등록된 RSS 목록 표시 */}
      <h3 className={styles.rssListTitle}>등록된 RSS 목록</h3>
      <ul className={styles.rssList}>
        {rssFeeds.length > 0 ? (
          rssFeeds.map((feed) => (
            <li key={feed.id} className={styles.rssListItem}>
              <strong>{feed.title}</strong>:{" "}
              <a href={feed.rssUrl} target="_blank" rel="noopener noreferrer">
                {feed.rssUrl}
              </a>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(feed.id)}
              >
                삭제
              </button>
            </li>
          ))
        ) : (
          <li className={styles.rssListItem}>등록된 RSS가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default RegisterRSS;
