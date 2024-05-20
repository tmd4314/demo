// src/components/Layout.js
import React from 'react';
import Footer from './pages/Footer';
import './css/Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
