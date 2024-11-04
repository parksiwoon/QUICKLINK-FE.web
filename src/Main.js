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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import CreateLinkPage from "./pages/CreateLinkPage";
import EditLinkPage from "./pages/EditLinkPage";
import Nav from "./components/Nav"; // Nav 컴포넌트 추가
import BottomNav from "./components/BottomNav"; // BottomNav 컴포넌트 추가

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<MyPageLayout />}>
            <Route path="me" element={<MyPage />} />
          </Route>
          <Route element={<FullLayout />}>
            <Route path="me/edit" element={<SettingPage />} />
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
    </BrowserRouter>
  );
}

export default Main;
