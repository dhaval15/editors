
import FadedButton from './FadedButton';
import {  Save,  } from 'react-feather';
import { useDispatch } from 'react-redux';
import {
	saveContentAsync,
} from '../../reducers/editorReducer';

const SceneToolbar = () => {
	const dispatch = useDispatch();
	return (
		<>
			<FadedButton
				label="Save"
				icon={<Save/>}
				onClick={() => {
					dispatch(saveContentAsync());
				}}
			/>
		</>
	)
}

export default SceneToolbar;
