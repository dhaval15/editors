import React, { useState, useEffect } from 'react';
import EditorConfigDialog from '../components/EditorConfigDialog';
import Editor from '../components/Editor';
import StatusBar from '../components/StatusBar';
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
	Heading,
} from '@chakra-ui/react';

import DraftApi from '../api/draftApi.ts';
import { useParams } from 'react-router-dom';
import { Plus, Save, ArrowDown} from 'react-feather'; // Import icons from the icon library
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentScene,
	setContent,
	fetchDraftAsync,
	selectTitle,
} from '../reducers/editSceneReducer';

const EditScenePage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
  const minimal = useSelector((state) => state.editScene.minimal);
  const title = useSelector(selectTitle);
	const status = useSelector((state) => state.editScene.status);
  const error = useSelector((state) => state.editScene.error);

  useEffect(() => {
		dispatch(fetchDraftAsync(id));
  }, [id]);

	const [config, setConfig] = useState({
		verticalPadding: 32,
		horizontalPadding: '200',
		fontSize: 28,
		lineHeight: 1.5,
		textAlign: 'justify',
		fontFace: 'Baskerville',
	});

	const keyMap = {
		TEST: 'alt+g'
	};
	
	const handlers = {
		TEST: (event) => {
			event.preventDefault();
			console.log('test');
		},
	};

	if (status == 'succeeded')
		return (
			<HotKeys keyMap={keyMap} handlers={handlers}>
				<Flex direction="column" height="100vh">
				{(!minimal && <Flex justify="space-between" align="center" bg="white" px={8} py={4}>
            <Heading 
							style={{
								color: 'grey',
  							opacity: 0.2,
							}} 
							size="xl">{title}</Heading>
						<Spacer/>
						<ButtonGroup >
							<SceneToolbar/>
							<EditorConfigDialog onSave={(c) => setConfig(c)} initialConfig={config}/>
						</ButtonGroup>
					</Flex>)}
					<Box flex="1" display="flex" height="100%" pb={minimal ? 0 : 8}>
						<Editor config={config}/>
					</Box>
					{(minimal && <StatusBar/>)}
				</Flex>
			</HotKeys>
		)
	if (status == 'failed')
		return (
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}>
				<Text> {error} </Text>
			</Box>
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
