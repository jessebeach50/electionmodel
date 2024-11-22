"use client";
import './components.css'

const ModelSelect = () => {

  return (
    <div className="model-select">
      <h2>Election</h2>
      <div className="button-container" id='pres'>
      <button><p>President</p></button>
      <button><p>Senate</p></button>
      <button><p>House</p></button>
      </div>

      <h2>Model</h2>
      <div className="button-container" id='model'>
      <button><p>2024</p></button>
      <button><p>2020</p></button>
      <button><p>2016</p></button>
      <button><p>2012</p></button>
      </div>

      <h2>Actual Results</h2>
      <div className="button-container" id='results'>
      <button><p>2024</p></button>
      <button><p>2020</p></button>
      <button><p>2016</p></button>
      <button><p>2012</p></button>
      </div>
    </div>
  );
};

export default ModelSelect;