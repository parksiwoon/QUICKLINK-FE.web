// MePage.js
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import HorizontalRule from "../components/HorizontalRule";
import styles from "./MePage.module.css";
import { useAuth } from "../contexts/AuthProvider";

function MePage() {
  const { user } = useAuth(true);
  const navigate = useNavigate();

  // 편집 버튼 클릭 시 /me/info/edit로 이동
  function handleEditClick() {
    navigate("/me/info/edit");
  }

  if (!user) {
    // 로그인하지 않은 사용자라면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1 className={styles.Heading}>내 정보</h1>
      <HorizontalRule className={styles.HorizontalRule} />
      <header className={styles.Header}>
        <Card className={styles.Profile}>
          <Avatar src={user.avatar} alt="프로필 이미지" />
          <div className={styles.Values}>
            <div className={styles.Name}>{user.name}</div>
            <div className={styles.Email}>{user.email}</div>
          </div>
          <Button
            className={styles.EditButton}
            onClick={handleEditClick}
            as="a"
          >
            편집
          </Button>
        </Card>
        <p className={styles.Bio}>
          {user.bio ??
            "아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"}
        </p>
      </header>
    </div>
  );
}

export default MePage;
