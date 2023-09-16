import {
	Text,
	IconButton,
} from '@chakra-ui/react';

import DraftApi from '../api/draftApi.ts';
import FadedButton from '../components/FadedButton';
import { Plus, Save, ArrowUp, ArrowDown } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
	setContent,
	saveContentAsync,
	nextScene,
	previousScene,
	selectWordCount,
	selectTitle,
} from '../reducers/editSceneReducer';

const SceneToolbar = () => {
	const dispatch = useDispatch();
  const draft = useSelector((state) => state.editScene.draft);
  const sceneIndex = useSelector((state) => state.editScene.sceneIndex);
  const title = useSelector(selectTitle);
  const wordCount = useSelector(selectWordCount);
	const length = draft.scenes.length;
	return (
		<>
			<FadedButton
				label="Create New Scene"
				icon={<Plus/>}
				onClick={() => {
					// setScene(null);
					// DraftApi.createScene(draft.id, {content: ''}).then((res) => {
					// 	setIndex(draft.scenes.length - 1);
					// });
				}}
			/>
			<FadedButton
				label="Prev Scene"
				icon={<ArrowUp/>}
				onClick={() => dispatch(previousScene())}
			/>
			<FadedButton
				label="Next Scene"
				icon={<ArrowDown/>}
				onClick={() => dispatch(nextScene())}
			/>
			<FadedButton
				label="Save"
				icon={<Save/>}
				onClick={() => {
					// const content = localStorage.getItem('editorContent');
					// DraftApi.updateScene(draft.id, draft.scenes[index], content).then((res) => {
					// 	console.log('Saved successfully');
					// });
				}}
			/>
		</>
	)
}

export default SceneToolbar;
