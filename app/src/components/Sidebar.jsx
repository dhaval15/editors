import React, { useState } from 'react';
//import './Sidebar.css';

function Sidebar({ onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
  };

  return (
    <div className="sidebar">
      <div className="settings">
        <div className="theme-selector">
          <label htmlFor="theme">Select Theme:</label>
          <select
            id="theme"
            value={selectedTheme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
            <option value="night-mode">Night Mode</option>
            <option value="solarized-light">Solarized Light</option>
            <option value="solarized-dark">Solarized Dark</option>
            <option value="mint-green">Mint Green</option>
            <option value="ocean-blue">Ocean Blue</option>
            <option value="autumn">Autumn</option>
            <option value="slate-gray">Slate Gray</option>
          </select>
        </div>
        {/* Add other settings options here */}
      </div>
      <div className="word-count">
        {/* Display the word count here */}
      </div>
    </div>
  );
}

export default Sidebar;
