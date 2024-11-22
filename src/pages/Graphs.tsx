// pages/Graphs.tsx
import React from 'react';
import './pages.css'

interface GraphsProps {
  layoutClass: string;
}

const Graphs: React.FC<GraphsProps> = ({ layoutClass }) => (
  <div className={layoutClass}>
    <div className="left-column stripe"></div>
    <main className="right-column">
      <h2>Graphs Page</h2>
    </main>
  </div>
);

export default Graphs;
