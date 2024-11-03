import styles from "./Nav.module.css";
import Button from "./Button";
import Link from "./Link";
import Avatar from "./Avatar";
import logoImage from "../assets/logo.svg";
import SearchBar from "./SearchBar"; // 상단 검색바 추가
import BottomNav from "./BottomNav"; // 하단 네비게이션 추가

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

function Nav() {
  return (
    <>
      <header className={styles.Container}>
        <nav className={styles.Nav}>
          <Link to="/">
            <img className={styles.Logo} src={logoImage} alt="logo" />
          </Link>
          <SearchBar /> {/* 상단에 검색바 추가 */}
          <div className={styles.Menu}>
            {user ? (
              <>
                {user.name}
                <Avatar src={user.avatar} size="small" />
                <div className={styles.Divider} />
                <Button as={Link} appearance="secondary" onClick={logout}>
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
      <BottomNav /> {/* 하단에 네비게이션 바 추가 */}
    </>
  );
}

export default Nav;
