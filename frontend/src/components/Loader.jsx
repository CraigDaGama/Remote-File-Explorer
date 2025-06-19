import React from 'react';
import './Loader.css'; // optional CSS if you want spinner animation

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading files...</p>
    </div>
  );
}
