import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage"; // 초기 페이지로 HomePage만 추가

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
