import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { tokenStorage } from "../Utils/tokenStorage";

const URL = "http://localhost:3000";

// הגדרת type עבור התגובה של בקשת ה refresh
type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

// הגדרת type עבור בקשות חוזרות של axios
// שמו אפשרות להוסיף את המאפיין _retry בשביל למנוע לולאות אינסופיות של בקשות חוזרות עי שימוש ב-interceptor
type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
// אנחנו יוצרים מופע של axios עם הגדרות ברירת מחדל
const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
  Request Interceptor

  לפני כל בקשה:
  לוקח את ה-accessToken מה-localStorage
  ומוסיף אותו ל-Authorization Header.
*/
api.interceptors.request.use(
  (config) => {
    const accessToken = tokenStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/*
  Response Interceptor

  אם בקשה חוזרת עם 401:
  1. לוקחים את ה-refreshToken
  2. מבקשים מהשרת טוקן חדש
  3. שומרים את הטוקן החדש
  4. שולחים מחדש את הבקשה שנכשלה
*/
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");

    /*
      עושים Refresh רק כאשר:
      - התקבלה שגיאת 401
      - עדיין לא ניסינו Refresh לבקשה הזאת
      - זו לא בקשת login/register/refresh
    */
    if (status !== 401 || originalRequest._retry || isAuthRequest) {
      return Promise.reject(error);
    }

    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      tokenStorage.clearTokens();

      return Promise.reject(error);
    }

    /*
      מסמן שכבר ניסינו Refresh לבקשה הזאת.
      זה מונע לולאה אינסופית.
    */
    originalRequest._retry = true;

    try {
      /*
        משתמשים כאן ב-axios הרגיל ולא ב-api.

        הסיבה:
        אנחנו לא רוצים שבקשת ה-refresh עצמה
        תפעיל שוב את אותו interceptor.
      */
      const refreshResponse = await axios.post<RefreshResponse>(
        `${URL}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const newAccessToken = refreshResponse.data.accessToken;

      const newRefreshToken = refreshResponse.data.refreshToken;

      /*
        אם השרת מחזיר גם refreshToken חדש,
        שומרים מחדש את שניהם.
      */
      if (newRefreshToken) {
        tokenStorage.setTokens(newAccessToken, newRefreshToken);
      } else {
        /*
          אם השרת מחזיר רק accessToken,
          מעדכנים רק אותו.
        */
        tokenStorage.setAccessToken(newAccessToken);
      }

      /*
        מעדכנים את הבקשה המקורית שנכשלה
        עם ה-accessToken החדש.
      */
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      /*
        שולחים מחדש את אותה בקשה.

        לדוגמה:
        GET /boards
      */
      return api(originalRequest);
    } catch (refreshError) {
      if (axios.isAxiosError(refreshError)) {
        const refreshStatus = refreshError.response?.status;

        if (refreshStatus === 401 || refreshStatus === 403) {
          tokenStorage.clearTokens();
        }
      }

      return Promise.reject(refreshError);
    }
  },
);

export default api;
