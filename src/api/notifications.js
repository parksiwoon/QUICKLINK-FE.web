//알림 데이터를 가져오는 함수입니다.
import axios from "../lib/axios";

// 알림 데이터 가져오기
export const fetchNotifications = async () => {
  try {
    const response = await axios.get("/notification");
    return response.data.result;
  } catch (error) {
    console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
