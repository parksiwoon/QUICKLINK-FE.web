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

const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

function SettingPage() {
  const [initialAvatar, setInitialAvatar] = useState("");
  const [values, setValues] = useState({
    profile: "", // 프로필 이미지 URL
    username: "", // 이름
    description: "", // 소개
  });

  const [isUploading, setIsUploading] = useState(false); // 업로드 상태
  const navigate = useNavigate();
  const { user, updateMe } = useAuth(true);

  function handleChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  // 이미지 업로드 핸들러
  async function handleImageUpload(file) {
    if (!file) {
      alert("이미지 파일이 선택되지 않았습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // 이미지 호스팅 서비스로 업로드
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, // API 키 추가
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // 명시적으로 Content-Type 설정
      );

      const imageUrl = response.data.data.url; // 업로드된 이미지의 URL
      handleChange("profile", imageUrl); // profile 값 업데이트
      alert("이미지 업로드 성공!");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  }

  // 폼 제출 핸들러
  async function handleSubmit(e) {
    e.preventDefault();

    const updatedData = {
      profile: values.profile,
      username: values.username,
      description: values.description,
    };

    try {
      await updateMe(updatedData);
      alert("프로필이 성공적으로 수정되었습니다!");
      navigate("/me/info");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  }

  useEffect(() => {
    if (user) {
      const { profile, username, description } = user;
      setValues({
        profile,
        username,
        description,
      });
      setInitialAvatar(profile);
    }
  }, [user]);

  return (
    <>
      <h1 className={styles.Heading}>프로필 편집</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <AvatarInput
          name="profile"
          initialAvatar={initialAvatar}
          className={styles.Input}
          onUpload={handleImageUpload} // 이미지 업로드 핸들러
          isUploading={isUploading}
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
          onChange={(e) => handleChange("username", e.target.value)}
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
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}

export default SettingPage;
