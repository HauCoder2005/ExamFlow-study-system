import { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./routes/Router.routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";

import "./App.css"
const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="spinner-border text-primary" role="status" />
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Giả lập load data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Mỗi khi URL đổi -> loading

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className={!loading ? "fade-in" : ""}>
        <Router />
      </div>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
