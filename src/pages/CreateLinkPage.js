import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./CreateLinkPage.module.css";
import { useAuth } from "../contexts/AuthProvider";

function CreateLinkPage() {
  const [values, setValues] = useState({
    siteName: "",
    url: "",
  });
  const navigate = useNavigate();
  useAuth(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { siteName, url } = values;
    await axios.post("/link", { siteName, url });
    navigate("/me");
  }

  return (
    <>
      <h1 className={styles.Heading}>링크 추가</h1>
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
        <Button className={styles.Button}>등록하기</Button>
      </form>
    </>
  );
}

export default CreateLinkPage;
