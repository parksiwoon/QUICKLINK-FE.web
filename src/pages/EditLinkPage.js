import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./EditLinkPage.module.css";
import { useAuth } from "../contexts/AuthProvider";

function EditLinkPage() {
  const [values, setValues] = useState({
    siteName: "",
    url: "",
  });
  const { linkId } = useParams();

  const navigate = useNavigate();
  useAuth(true);

  async function getLink(linkId) {
    console.log("getLink 호출, linkId:", linkId);
    try {
      const res = await axios.get(`/link/${linkId}`);
      console.log("API Response:", res.data); // 응답 확인
      const { siteName, url } = res.data.result;
      setValues({ siteName, url });
    } catch (error) {
      console.error("링크 데이터를 불러오지 못했습니다:", error);
      alert("링크 데이터를 불러오는 데 실패했습니다.");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기
    if (!token) throw new Error("AccessToken이 없습니다.");

    e.preventDefault();
    const { siteName, url } = values;
    await axios.put(`/link/${linkId}`, { siteName, url });
    navigate("/me");
  }

  useEffect(() => {
    if (linkId) {
      console.log("useEffect 실행, linkId:", linkId);
      getLink(linkId);
    }
  }, [linkId]);

  return (
    <>
      <h1 className={styles.Heading}>링크 편집</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="siteName">
          사이트 이름
        </Label>
        <Input
          id="siteName"
          className={styles.Input}
          name="siteName"
          type="text"
          placeholder="사이트 이름"
          value={values.siteName}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="url">
          링크
        </Label>
        <Input
          id="url"
          className={styles.Input}
          name="url"
          type="text"
          placeholder="https://www.example.com"
          value={values.url}
          onChange={handleChange}
        />
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}

export default EditLinkPage;
