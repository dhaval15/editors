import React, { useState, useEffect } from 'react';
import { Textarea } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import {
	setContent,
  selectCurrentSceneContent,
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

  const content = useSelector(selectCurrentSceneContent);
  const index = useSelector((state) => state.editScene.sceneIndex);
  const [liveContent, setLiveContent] = useState('');

	useEffect(() => {
		setLiveContent(content);
	}, [index]);

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

	const textareaRef = React.useRef(null);

	useEffect(() => {
		const dash = "-";
		const emdash = "—"; // Shift+Option+Hyphen
		const element = textareaRef.current;
    
    if (!element) return;
 
		element.addEventListener( "keydown", handleKeydown, false );
 
		function handleKeydown( event ) {
 
			var target = event.target;
 
			if ( event.key !== dash ) {
 
				return;
 
			}
 
			var offset = target.selectionStart;
			console.log('Emdash');
 
			if ( target.value[ offset - 1 ] === dash ) {
 
				event.preventDefault();
 
				var beforeDash = target.value.slice( 0, ( offset - 1 ) );
				var afterDash = target.value.slice( offset );
 
				target.value = ( beforeDash + emdash + afterDash );
 
				target.selectionStart = offset;
				target.selectionEnd = offset;
 
			}
 
		}
	}, []);



  return (
		<Textarea
      value={liveContent}
      onChange={handleContentChange}
			className="scroll"
			placeholder="Start typing here ..."
			ref={textareaRef}
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
