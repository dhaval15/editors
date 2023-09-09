import React, { useState, useEffect } from 'react';
import EditorConfigDialog from '../components/EditorConfigDialog';
import Editor from '../components/Editor';
import SceneToolbar from '../components/SceneToolbar';
import { HotKeys } from "react-hotkeys";
import {
  Flex,
	Spacer,
	Box,
	Text,
	IconButton,
	CircularProgress,
	ButtonGroup,
} from '@chakra-ui/react';

import DraftApi from '../api/draftApi.ts';
import { useParams } from 'react-router-dom';
import { Plus, Save, ArrowDown} from 'react-feather'; // Import icons from the icon library

const EditScenePage = () => {
	const {draftId} = useParams();
	const [index, setIndex] = useState(0);
	const [draft, setDraft] = useState(null);
	const [scene, setScene] = useState(null);

	useEffect(() => {
		DraftApi.getDraft(draftId).then((res) => {
			setDraft(res);
		});
	}, [draftId]);

	useEffect(() => {
		if(draft != null) {
			const id = draft.scenes[index];
			DraftApi.getScene(draft.id, id).then((res) => {
				setScene(res);
			});
		}
	}, [draft, index]);

	const [config, setConfig] = useState({
		verticalPadding: 32,
		horizontalPadding: '200',
		fontSize: 28,
		lineHeight: 1.5,
		textAlign: 'justify',
		fontFace: 'Baskerville',
	});
	const onSave = (content) => {
		//Save to server;
		localStorage.setItem('editorContent', content);
	};
	const onChange = (content) => {
		//Save to local storage;
		localStorage.setItem('editorContent', content);
	};

	const keyMap = {
		TEST: 'alt+g'
	};
	
	const handlers = {
		TEST: (event) => {
			event.preventDefault();
			console.log('test');
		},
	};

	if (draft && scene)
		return (
			<HotKeys keyMap={keyMap} handlers={handlers}>
				<Flex direction="column" height="100vh">
					<Flex justify="space-between" align="center" bg="white" px={8} py={4}>
						<Spacer/>
						<ButtonGroup >
							<SceneToolbar
								draft={draft}
								setScene={setScene}
								index={index}
								setIndex={setIndex}
							/>
							<EditorConfigDialog onSave={(c) => setConfig(c)} initialConfig={config}/>
						</ButtonGroup>
					</Flex>
					<Box flex="1" display="flex" height="100%" pb={8}>
						<Editor 
							config={config} 
							initialContent={scene.content} 
							onSave={onSave}
							onChange={onChange}/>
					</Box>
				</Flex>
			</HotKeys>
		)
	return (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}>
			<CircularProgress isIndeterminate color='green.300' />
		</Box>
	)
};

export default EditScenePage;
