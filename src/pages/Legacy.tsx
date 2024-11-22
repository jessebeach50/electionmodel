import React, { useState } from 'react';
import './pages.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

const Legacy: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('/legacy/President.html'); // Default to President

  const handlePageSwitch = (page: string) => {
    setCurrentPage(`/legacy/${page}.html`);
  };

  return (
    <div>
      <div className="swapPage">
        <button onClick={() => handlePageSwitch('President')}>President</button>
        <button onClick={() => handlePageSwitch('Senate')}>Senate</button>
        <button onClick={() => handlePageSwitch('House')}>House</button>
      </div>

      <div className="exitLegacy">
        <Link to="/about">
          <button>Exit Legacy</button>
        </Link>
      </div>
      <iframe className="legacyPortal" src={currentPage} title="Legacy Page" />
    </div>
  );
};

export default Legacy;
