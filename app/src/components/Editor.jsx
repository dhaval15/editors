import React, { useState, useEffect } from 'react';
import { Textarea } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

const Editor = ({ config, initialContent, onSave, onChange}) => {
	const TYPING_INTERVAL = 5000;
  const { fontSize, lineHeight, fontFace, horizontalPadding, verticalPadding, textAlign} = config;

  const textareaStyle = {
    fontSize: fontSize,
    lineHeight: lineHeight,
    fontFamily: fontFace,
  };

	const padding = {
		pt: verticalPadding,
		px: horizontalPadding,
		pb: horizontalPadding,
	}

  const [content, setContent] = useState(initialContent);

	const debouncedSave = React.useRef(
		debounce((text) => {
			onSave(text);
		}, TYPING_INTERVAL)
	).current;

  const handleContentChange = (e) => {
    setContent(e.target.value);
		debouncedSave(e.target.value);
  };

	React.useEffect(() => {
		return () => {
			debouncedSave.cancel();
		};
	}, [debouncedSave]);



  return (
		<Textarea
      value={content}
      onChange={handleContentChange}
			class="scroll"
			placeholder="Start typing here ..."
      style={{
				fontSize: fontSize,
				lineHeight: lineHeight,
				fontFamily: fontFace,
				padding: `${verticalPadding}px ${horizontalPadding}px`,
				width: '100%', // Full width
				height: '100%', // Full height
				boxSizing: 'border-box',
				textAlign: textAlign
			}}
			variant='unstyled'
      resize="none" 
      size="md" 
			{... padding}
    />
  );
};

export default Editor;
