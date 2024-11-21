import { useState } from "react"; // useState 추가
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import {
  FullLayout,
  LandingLayout,
  MyPageLayout,
  UserLayout,
} from "./components/Layout";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import MePage from "./pages/MePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import CreateLinkPage from "./pages/CreateLinkPage";
import EditLinkPage from "./pages/EditLinkPage";
import Nav from "./components/Nav"; // Nav 컴포넌트 추가
import BottomNav from "./components/BottomNav"; // BottomNav 컴포넌트 추가
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function Main() {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  return (
    <BrowserRouter>
      <AuthProvider>
        <App>
          {/* Nav 컴포넌트는 App에 포함하여 모든 페이지에 상단바로 고정 */}
          <Nav onSearch={setSearchTerm} />
          <Routes>
            <Route element={<LandingLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route element={<MyPageLayout />}>
              {/* 검색어를 MyPage로 전달 */}
              <Route path="me" element={<MyPage searchTerm={searchTerm} />} />
              <Route path="me/info" element={<MePage />} />
            </Route>
            <Route element={<FullLayout />}>
              <Route path="me/info/edit" element={<SettingPage />} />
              <Route path="me/links/create" element={<CreateLinkPage />} />
              <Route path="me/links/:linkId/edit" element={<EditLinkPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route element={<UserLayout />}>
              <Route path=":userId" element={<UserPage />} />
            </Route>
          </Routes>
          <BottomNav /> {/* 하단 BottomNav 컴포넌트 추가 */}
        </App>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Main;
