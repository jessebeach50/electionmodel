"use client";
import './components.css'

const ModelSelect = () => {

  return (
    <div className="wincall-select">
      <select name="StateDrop" id="StateDrop"></select>
      <h3>Call state for:</h3>
      <div className="call-button-box">
        <button className="callD"><p>Dem</p></button>
        <button className="callR"><p>Rep</p></button>
      </div>

      <div className="winput-box">
        <p>Enter a number between 0 and 100 (Dem win %)</p>
        <div className='winput-number'>
          <input type="number" />
          <button>Enter</button>
        </div>
        <input type="range" />
      </div>
    </div>
  );
};

export default ModelSelect;