const RENDER_API_URL = "https://daouda-souare-evaluation-finaleh26.onrender.com";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : RENDER_API_URL);

export default API_URL;
