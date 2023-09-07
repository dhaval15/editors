import React from 'react';
import './SettingsDialog.css';

function SettingDialog({ isOpen, onClose, onSelectTheme, settings, onChangeSettings}) {
  const themes = [
    'light',
    'dark',
    'sepia',
    'night-mode',
    'solarized-light',
    'solarized-dark',
    'mint-green',
    'ocean-blue',
    'autumn',
    'slate-gray',
  ];

  const handleThemeSelect = (theme) => {
    onSelectTheme(theme);
    onClose();
  };

  return isOpen ? (
    <div className="setting-dialog">
      <h2>Settings</h2>
      <div className="settings-option">
        <label htmlFor="theme">Select Theme:</label>
        <select
          id="theme"
          onChange={(e) => handleThemeSelect(e.target.value)}
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div className="settings-option">
        <label htmlFor="fontSize">Font Size:</label>
        <input
          type="range"
          id="fontSize"
          min="12"
          max="24"
          step="2"
					value={settings.fontSize}
          onChange={(e) => {
						const s = Object.assign({}, settings);
						s['fontSize'] = e;
						onChangeSettings(s);
					}}
        />
      </div>
      <div className="settings-option">
        <label htmlFor="fontFace">Font Face:</label>
        <select
          id="fontFace"
					value={settings.fontFace}
          onChange={(e) => {
						const s = Object.assign({}, settings);
						s['fontFace'] = e;
						onChangeSettings(s);
					}}
        >
          {/* Add font face options here */}
        </select>
      </div>
      <div className="settings-option">
        <label htmlFor="lineSpacing">Line Spacing:</label>
        <input
          type="range"
          id="lineSpacing"
          min="1"
          max="2"
          step="0.1"
					value={settings.lineSpacing}
          onChange={(e) => {
						const s = Object.assign({}, settings);
						s['lineSpacing'] = e;
						onChangeSettings(s);
					}}
        />
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}

export default SettingDialog;
