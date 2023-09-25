import { 
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import DraftApi from '../api/draftApi.ts'; 

export const fetchDraftAsync = createAsyncThunk('editScene/fetchDraft', async (id) => {
  const response = await DraftApi.getDraft(id, true);
  return response;
});

export const saveContentAsync = createAsyncThunk('editScene/saveContent', async (_, thunkApi) => {
	const state = thunkApi.getState().editScene;
	const draft = state.draft;
	const content = state.content;
	const sceneIndex = state.sceneIndex;
	if (draft != null && sceneIndex != null && content != null) {
		const sceneId = draft.scenes[sceneIndex].id;
		const response = await DraftApi.updateScene(draft.id, sceneId, {content});
		return response;
	}
  throw 'Already up to date';
});

export const createSceneAsync = createAsyncThunk('editScene/createScene', async (_, thunkApi) => {
	const state = thunkApi.getState().editScene;
	const content = state.content;
	if (content != null) {
		throw 'Unsaved content';
	}
	const draft = state.draft;
	const sceneIndex = state.sceneIndex;
	if (draft != null && sceneIndex != null) {
		const response = await DraftApi.createScene(draft.id, {content: '', title: 'Untitled', insert: sceneIndex + 1});
		return {
			id: response,
			index: sceneIndex + 1,
		};
	}
  throw 'Inconsistent State';
});

const editSceneSlice = createSlice({
  name: 'editScene',
  initialState: {
		draft: null,
		sceneIndex: null,
		content: null,
		minimal: true,
		contentUpdated: true,
		lastSave: null,
	},
	reducers: {
		setIndex: (state, action) => {
			if (state.content != null) {
				state.message = 'Unsaved content';
			}
			else if (action.payload < state.draft.scenes.length){
				state.sceneIndex = action.payload;
			}
		},
		nextScene: (state, action) => {
			if (state.content != null) {
				state.message = 'Unsaved content';
			}
			else if (state.sceneIndex < state.draft.scenes.length - 1){
				state.sceneIndex++;
			}
		},
		previousScene: (state, action) => {
			if (state.content != null) {
				state.message = 'Unsaved content';
			}
			else if (state.sceneIndex != 0){
				state.sceneIndex--;
			}
		},
		setContent: (state, action) => {
			state.content = action.payload;
			localStorage.setItem('editorContent', state.content); 
		},
		clearMessage: (state, action) => {
			state.message = null;
		},
		clear: (state, action) => {
			if (state.content == null) {
				state.draft = null;
				state.sceneIndex = null;
				state.content = null;
				localStorage.setItem('editorContent', null);
				state.lastSave = null;
				state.message = null;
				action.payload();
			}
			else {
				state.message = 'Unsaved content';
			}
		}
	},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDraftAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchDraftAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.draft = action.payload;
				state.sceneIndex = 0;
      })
      .addCase(fetchDraftAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      })
      .addCase(saveContentAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(saveContentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
				state.content = null;
        state.draft.scenes[state.sceneIndex] = action.payload;
        state.draft = {
					... state.draft,
					scenes: state.draft.scenes,
				};
				//state.lastSave = new Date();
      })
      .addCase(saveContentAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      })
      .addCase(createSceneAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createSceneAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
				state.sceneIndex = action.payload.index;
        state.draft.scenes.splice(state.sceneIndex, 0, action.payload.id);
        state.draft = {
					... state.draft,
					scenes: state.draft.scenes,
				};
      })
      .addCase(createSceneAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      });
	},
});

export const selectWordCount = (state) => {
	const content = state.editScene.content ?? selectCurrentSceneContent(state);
	if (content == null)
		return 0;
  const words = content.trim().split(/\s+/);
  const wordCount = words.length;
  return wordCount;
}

export const selectTitle = (state) => {
	const draft = state.editScene.draft;
	const sceneIndex = state.editScene.sceneIndex;
	if (draft != null && sceneIndex != null) {
		return `${draft.title} >> ${draft.scenes[sceneIndex].title} (${sceneIndex+1}/${draft.scenes.length})`;
	}
	return null;
}

export const selectCurrentScene = (state) => {
	const draft = state.editScene.draft;
	const sceneIndex = state.editScene.sceneIndex;
	if (draft != null && sceneIndex != null) {
		return draft.scenes[sceneIndex];
	}
	return null;
}

export const selectCurrentSceneContent = (state) => {
	const draft = state.editScene.draft;
	const sceneIndex = state.editScene.sceneIndex;
	if (draft != null && sceneIndex != null) {
		return draft.scenes[sceneIndex].content ?? '';
	}
	return null;
}

export const {
	setDraft, 
	setIndex,
	setContent,
	nextScene,
	previousScene,
	clearMessage,
	clear,
} = editSceneSlice.actions;

export default editSceneSlice.reducer;
