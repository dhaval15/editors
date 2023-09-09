import {
	Text,
	IconButton,
} from '@chakra-ui/react';

import DraftApi from '../api/draftApi.ts';
import FadedButton from '../components/FadedButton';
import { Plus, Save, ArrowUp, ArrowDown } from 'react-feather';

const SceneToolbar = ({draft, index, setScene, setIndex}) => {
	const length = draft.scenes.length;
	return (
		<>
			<FadedButton
				label="Create New Scene"
				icon={<Plus/>}
				onClick={() => {
					setScene(null);
					DraftApi.createScene(draft.id, {content: ''}).then((res) => {
						setIndex(draft.scenes.length - 1);
					});
				}}
			/>
			<FadedButton
				label="Prev Scene"
				icon={<ArrowUp/>}
				onClick={() => {
					if (index != 0){
						setScene(null);
						setIndex(index - 1);
					}
				}}
			/>
			<FadedButton
				label="Next Scene"
				icon={<ArrowDown/>}
				onClick={() => {
					if (index < draft.scenes.length - 1){
						setScene(null);
						setIndex(index + 1);
					}
				}}
			/>
			<FadedButton
				label="Save"
				icon={<Save/>}
				onClick={() => {
					const content = localStorage.getItem('editorContent');
					DraftApi.updateScene(draftId, id, content).then((res) => {
						console.log('Saved successfully');
					});
				}}
			/>
		</>
	)
}

export default SceneToolbar;
