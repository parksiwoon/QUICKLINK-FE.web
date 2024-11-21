import { useState } from "react";
import styles from "./Nav.module.css";
import Button from "./Button";
import Link from "./Link";
import Avatar from "./Avatar";
import logoImage from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthProvider";
import SearchBar from "./SearchBar"; // 상단 검색바 추가

export function PublicNav() {
  return (
    <header className={styles.Container}>
      <nav className={`${styles.Nav} ${styles.public}`}>
        <Link to="/">
          <img className={styles.Logo} src={logoImage} alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav({ onSearch }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className={styles.Container}>
        <nav className={styles.Nav}>
          <Link to="/">
            <img className={styles.Logo} src={logoImage} alt="logo" />
          </Link>
          <SearchBar onSearch={onSearch} /> {/* 검색어 전달 */}
          <div className={styles.Menu}>
            {user ? (
              <>
                <span>{user.username}</span>
                <Avatar src={user.profile} size="small" />
                <div className={styles.Divider} />
                <Button as={Link} appearance="secondary" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} appearance="secondary" to="/login">
                  로그인
                </Button>
                <Button as={Link} to="/register">
                  회원가입
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Nav;
