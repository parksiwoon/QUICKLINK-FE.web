import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Link from "../components/Link";
import HorizontalRule from "../components/HorizontalRule";
import styles from "./MyPage.module.css";
import PlusSquareImage from "../assets/plus-square.svg";
import LinkCard from "../components/LinkCard";
import { useAuth } from "../contexts/AuthProvider";

function MyPage() {
  const { user } = useAuth(true);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  // 링크 데이터를 가져오는 함수
  async function getMyLinks() {
    const res = await axios.get("/users/me/links");
    const nextLinks = res.data;
    setLinks(nextLinks);
  }

  // 링크 편집
  function handleEditClick(linkId) {
    navigate(`/me/links/${linkId}/edit`);
  }

  // 링크 삭제
  function handleDeleteClick(linkId) {
    axios.delete(`/users/me/links/${linkId}`);
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
  }

  useEffect(() => {
    getMyLinks();
  }, []);

  if (!user) {
    // 로그인하지 않은 사용자라면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <h1 className={styles.Heading}>나의 링크</h1>
      <HorizontalRule className={styles.HorizontalRule} />
      <ul className={styles.LinkList}>
        {links.map((link) => (
          <li className={styles.LinkItem} key={link.id}>
            <LinkCard
              title={link.title}
              url={link.url}
              thumbUrl={link.thumbUrl}
              onClick={() => handleEditClick(link.id)}
              onDelete={() => handleDeleteClick(link.id)}
            />
          </li>
        ))}
        <li>
          <Link className={styles.CreateLink} to="/me/links/create">
            <img src={PlusSquareImage} alt="더하기 아이콘" />
            링크 추가하기
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MyPage;
