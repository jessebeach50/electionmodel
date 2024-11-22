// pages/About.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './pages.css'

interface AboutProps {
  layoutClass: string;
}

const About: React.FC<AboutProps> = ({ layoutClass }) => (
  <div className={layoutClass}>
    <div className="left-column stripe"></div>
    <main className="center-column">
      <h2>About Page</h2>
      <div className="legacyButton">
        <Link to="/legacy"><button><p>Legacy Site</p></button></Link>
      </div>
      <div className="aboutText">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores hic, aut assumenda dolorem eius expedita obcaecati repellat tenetur iste ipsa saepe totam nulla? Voluptates veritatis dolorum, iusto debitis provident accusantium! Aliquid inventore sint laborum dolorem magnam, pariatur, nemo tenetur eligendi consequuntur vitae nostrum aperiam expedita, in sequi mollitia est. Vero officia totam maiores itaque mollitia impedit, autem repellendus excepturi! Hic explicabo harum consectetur natus totam, nobis aspernatur asperiores, ea quidem velit eligendi modi commodi possimus eius fuga saepe rem repudiandae nulla porro dolore molestiae labore sed at? Inventore distinctio impedit voluptas dolorum, blanditiis modi minus architecto? Perferendis omnis facilis dolore!
      </div>

    </main>
    <div className="right-column stripe"></div>
  </div>
);

export default About;
