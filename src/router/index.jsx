// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

// 创建路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

// 使用默认导出
export default router;  // 关键修改点