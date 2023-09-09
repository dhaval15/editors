import React, { useEffect } from 'react';

const ShortcutsOverlay = ({ shortcuts, children}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
			console.log(e.key);
      const shortcutFunction = shortcuts[e.key];

      if (shortcutFunction && typeof shortcutFunction === 'function') {
        // Execute the shortcut function if it exists
        shortcutFunction();
      }
    };

    // Add event listener for keydown events
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return children; // This component doesn't render anything
};

export default ShortcutsOverlay;

