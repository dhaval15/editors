import React, { useState, useEffect } from 'react';
import { Textarea } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import {
	setContent,
} from '../reducers/editSceneReducer';

const Editor = ({ config }) => {
	const dispatch = useDispatch();
	const TYPING_INTERVAL = 2000;
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

  const content = useSelector((state) => state.editScene.content);
  const [liveContent, setLiveContent] = useState(content ?? '');

	const debouncedSave = React.useRef(
		debounce((text) => {
			dispatch(setContent(text));
		}, TYPING_INTERVAL)
	).current;

  const handleContentChange = (e) => {
		debouncedSave(e.target.value);
    setLiveContent(e.target.value);
  };

	React.useEffect(() => {
		return () => {
			debouncedSave.cancel();
		};
	}, [debouncedSave]);



  return (
		<Textarea
      value={liveContent}
      onChange={handleContentChange}
			className="scroll"
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
