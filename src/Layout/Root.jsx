import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Componentes/Header.jsx';
import Footer from '../Componentes/Footer.jsx';
import AIChatbot from '../components/AIChatbot/AIChatbot.jsx';

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titleMap = {
      "/": "Home",
      "/allmeals": "Meals",
      "/contact": "Contact",
      "/signup": "Sign Up",
      "/signin": "Sign In",
      "/dashboard": "Dashboard",
    };

    const pageName = titleMap[path] || "LocalChefBazaar";
    document.title = `LocalChefBazaar || ${pageName}`;
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Outlet />
      <br />
      <br />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Root;