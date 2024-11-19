import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Link from "../components/Link";
import HorizontalRule from "../components/HorizontalRule";
import styles from "./MyPage.module.css";
import PlusSquareImage from "../assets/plus-square.svg";
import LinkCard from "../components/LinkCard";
import { useAuth } from "../contexts/AuthProvider";

function MyPage({ searchTerm }) {
  const { user } = useAuth(true);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  // 링크 데이터를 가져오는 함수
  async function getMyLinks() {
    const res = await axios.get("/users/me/links");
    setLinks(res.data);
  }

  // 링크 편집 후 반영
  async function updateLink(linkId, updatedData) {
    try {
      await axios.put(`/users/me/links/${linkId}`, updatedData);
      getMyLinks(); // 링크 업데이트 후 목록 재동기화
    } catch (error) {
      console.error("링크 수정 중 오류 발생", error);
    }
  }

  // 링크 삭제
  function handleDeleteClick(linkId) {
    axios
      .delete(`/users/me/links/${linkId}`)
      .then(() => {
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
      })
      .catch((error) => {
        console.error("링크 삭제 중 오류 발생", error);
      });
  }

  useEffect(() => {
    getMyLinks();
  }, []);

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()) // URL도 필터링 조건에 추가
  );

  return (
    <>
      <h1 className={styles.Heading}>나의 링크</h1>
      <HorizontalRule className={styles.HorizontalRule} />
      <ul className={styles.LinkList}>
        {filteredLinks.map((link) => (
          <li className={styles.LinkItem} key={link.id}>
            <LinkCard
              title={link.title}
              url={link.url}
              thumbUrl={link.thumbUrl}
              onClick={() => navigate(`/me/links/${link.id}/edit`)}
              onDelete={() => {
                axios.delete(`/users/me/links/${link.id}`);
                setLinks((prevLinks) =>
                  prevLinks.filter((prevLink) => prevLink.id !== link.id)
                );
              }}
              searchTerm={searchTerm} // 검색어 전달
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
