import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// الحصول على عنصر الجذر
const rootElement = document.getElementById("root");

// إنشاء الجذر باستخدام createRoot
const root = ReactDOM.createRoot(rootElement);

// عرض التطبيق
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
