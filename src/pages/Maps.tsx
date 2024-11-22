// pages/Maps.tsx
import React from 'react';
import './pages.css'

import MapPresident from '../mapComponents/MapPresident';
import ModelSelect from '../mapComponents/ModelSelect';
import WinCall from '../mapComponents/WinCall'

interface MapsProps {
  layoutClass: string;
}

const Maps: React.FC<MapsProps> = ({ layoutClass }) => (
  <div className={layoutClass}>
    <div className="left-column stripe">
      <div className="inset-panel">
        <ModelSelect />
      </div>
    </div>
    <main className="center-column">
      <MapPresident />
      <div className="results">
        <div className="results-bar"></div>
        <div className="results-text">
          <div><h4>Chance Democratic Win:</h4>
            <p>84.40</p></div>
          <div><h4>Projected EVs Democrats:</h4>
            <p>296.54</p></div>
        </div>
      </div>
    </main>
    <div className="right-column stripe">
      <div className="menu-panel">
        <WinCall />
      </div>
      <div className="inset-panel">
        <p>React remodel in development.</p>
        <hr />
        <p>Legacy site available through About page!</p>
      </div>
    </div>
  </div>
);

export default Maps;
