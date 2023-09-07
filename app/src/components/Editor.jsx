import React, { useState } from 'react';

function Editor({settings}) {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="editor-container">
      <textarea
        className="textarea"
				style={{
					fontSize: settings.fontSize,
					lineHeight: settings.lineHeight,
				}}
        placeholder="Start writing..."
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
}

export default Editor;
