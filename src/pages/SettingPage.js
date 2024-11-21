import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import AvatarInput from "../components/AvatarInput";
import styles from "./SettingPage.module.css";
import { useAuth } from "../contexts/AuthProvider";

function SettingPage() {
  const [initialAvatar, setInitialAvatar] = useState("");
  const [values, setValues] = useState({
    profile: "", // 프로필 이미지 URL
    username: "", // 이름
    description: "", // 소개
  });
  const navigate = useNavigate();
  const { user, updateMe } = useAuth(true);

  function handleChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedData = {
      profile: values.profile,
      username: values.username,
      description: values.description,
    };

    await updateMe(updatedData);
    navigate("/me/info");
  }

  useEffect(() => {
    const { profile, username, description } = user;
    setValues({
      profile,
      username,
      description,
    });
    setInitialAvatar(profile);
  }, [user]);

  return (
    <>
      <h1 className={styles.Heading}>프로필 편집</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <AvatarInput
          name="profile"
          initialAvatar={initialAvatar}
          className={styles.Input}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="username">
          이름
        </Label>
        <Input
          id="username"
          className={styles.Input}
          name="username"
          type="text"
          placeholder="이름"
          value={values.username}
          onChange={handleInputChange}
        />
        {/** 
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleInputChange}
        />
*/}
        <Label className={styles.Label} htmlFor="description">
          내 링크 소개
        </Label>
        <TextArea
          id="description"
          className={styles.TextArea}
          name="description"
          type="text"
          maxLength={64}
          placeholder="아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"
          value={values.description}
          onChange={handleInputChange}
        />
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}

export default SettingPage;
