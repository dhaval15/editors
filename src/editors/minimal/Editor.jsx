import React, { useState, useEffect } from 'react';
import { 
	Textarea,
	Flex,
	Heading,
	Spacer,
	ButtonGroup,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setContent,
	fetchContentAsync,
} from '../../reducers/editorReducer';
import debounce from 'lodash/debounce';

import LookupDialog from './LookupDialog';
import SceneToolbar from './SceneToolbar';
import StatusBar from './StatusBar';

const mappings = {
	'm': 'ml',
	's': 'rel_syn',
	'a': 'rel_ant',
	'k': 'rel_spc',
	'g': 'rel_gen',
	'c': 'rel_com',
	'p': 'rel_par',
	'x': 'rel_jjb',
	'h': 'rel_hom',
};

const Editor = () => {
	const minimal = true;
	const dispatch = useDispatch();
  useEffect(() => {
		dispatch(fetchContentAsync());
  }, []);
  const content = useSelector((state) => state.editor.savedContent);
	const config = {
		verticalPadding: 32,
		horizontalPadding: '200',
		fontSize: 26,
		lineHeight: 1.5,
		textAlign: 'justify',
		fontFace: 'Baskerville',
	};
	const TYPING_INTERVAL = 2000;
	const { fontSize, lineHeight, fontFace, horizontalPadding, verticalPadding, textAlign } = config;

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

	const [liveContent, setLiveContent] = useState('');

	useEffect(() => {
		setLiveContent(content);
	}, []);

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

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	useEffect(() => {
		const dash = "-";
		const emdash = "—";
		const element = textareaRef.current;

		if (!element) return;

		element.addEventListener("keydown", handleKeydown, false);

		function handleKeydown(event) {
			if (event.altKey) {
				const queryType = mappings[event.key]
				if (queryType) {
					const selection = window.getSelection();
					if (selection) {
						const target = event.target;
						const text = target.value.slice(target.selectionStart, target.selectionEnd);
						// dispatch(setSearchTerm({type: queryType, query: text.trim()}));
						// dispatch(reverseLookup());
					}
					openDialog();
				}
			} else if (event.key === 'Escape') {
				closeDialog();
				event.preventDefault();
			} else if (event.key === 'Escape') {

			} else {

				var target = event.target;

				if (event.key !== dash) {

					return;

				}

				var offset = target.selectionStart;

				if (target.value[offset - 1] === dash) {

					event.preventDefault();

					var beforeDash = target.value.slice(0, (offset - 1));
					var afterDash = target.value.slice(offset);

					target.value = (beforeDash + emdash + afterDash);

					target.selectionStart = offset;
					target.selectionEnd = offset;
				}
			}
		}
	}, []);

	return (
		<Flex direction="column" height="100vh">
			{(!minimal && <Flex justify="space-between" align="center" bg="white" px={8} py={4}>
				<Heading
					style={{
						color: 'grey',
						opacity: 0.2,
					}}
					size="xl">Minimal Editor</Heading>
				<Spacer />
				<ButtonGroup >
					<SceneToolbar />
				</ButtonGroup>
			</Flex>)}
			<Flex
				style={{
					justifyContent: "center",
					width: "100%",
					alignItems: "center",
					flex: 1,
				}}
				px="0em"
				pb={minimal ? 0 : 8}>
				<Textarea
					autoFocus
					value={liveContent}
					onChange={handleContentChange}
					className="scroll"
					placeholder="Start typing here ..."
					ref={textareaRef}
					id="mytextarea1"
					px='1em'
					py='4em'
					style={{
						fontSize: fontSize,
						lineHeight: lineHeight,
						fontFamily: fontFace,
						maxWidth: '30em',
						height: '100%',
						wrap: 'off',
						boxSizing: 'border-box',
						textAlign: textAlign,
					}}
					variant='unstyled'
					resize="none"
				/>
				<LookupDialog isOpen={isDialogOpen} onClose={closeDialog} />
			</Flex>
			{(minimal && <StatusBar />)}
		</Flex>
	);
};

export default Editor;
