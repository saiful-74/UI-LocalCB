import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componentes/Header.jsx';
import Footer from '../Componentes/Footer.jsx';
import AIChatbot from '../components/AIChatbot/AIChatbot.jsx';

const Root = () => {
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
