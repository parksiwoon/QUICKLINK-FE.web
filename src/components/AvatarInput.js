import { useEffect, useRef, useState } from "react";
import styles from "./AvatarInput.module.css";
import Avatar from "./Avatar";
import Button from "./Button";
import UploadImage from "../assets/upload.svg";

function AvatarInput({
  className,
  initialAvatar,
  name,
  onUpload,
  isUploading,
}) {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(initialAvatar);
  const inputRef = useRef();

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // 로컬 상태 업데이트
      onUpload(selectedFile); // 업로드 핸들러 호출
    }
  }

  function handleUploadClick() {
    inputRef.current?.click();
  }

  useEffect(() => {
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setAvatar(blobUrl);

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [file]);

  useEffect(() => {
    setAvatar(initialAvatar);
  }, [initialAvatar]);

  return (
    <div className={`${styles.AvatarInput} ${className}`}>
      <Avatar size="large" src={avatar} alt="아바타 이미지 미리보기" />
      <Button
        type="button"
        className={styles.UploadButton}
        appearance="secondary"
        onClick={handleUploadClick}
        disabled={isUploading} // 업로드 중 비활성화
      >
        <img src={UploadImage} alt="업로드" />
        사진 업로드
      </Button>
      <input
        className={styles.HiddenInput}
        type="file"
        onChange={handleChange}
        ref={inputRef}
        accept="image/*" // 이미지 파일만 허용
      />
    </div>
  );
}

export default AvatarInput;
