import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import backends from '../backends/all.ts';

export const fetchContentAsync = createAsyncThunk('editor/fetchContent', async (_, thunkApi) => {
	const state = thunkApi.getState().editor;
	const { params, backend } = state;
  const response = await backend.getContent(params);
  return response;
});

export const saveContentAsync = createAsyncThunk('editor/saveContent', async (_, thunkApi) => {
	const state = thunkApi.getState().editor;
	const {content, params, backend} = state;
  const response = await backend.postContent(content, params);
  return response;
});


const editorReducerSlice = createSlice({
	name: 'editorReducer',
	initialState: {
		backend: null,
		params: null,
		savedContent: null,
		content: null,
		message: null,
	},
	reducers: {
		setParams: (state, action) => {
			state.params = action.payload;
		},
		setBackend: (state, action) => {
			state.backend = backends[action.payload];
		},
		setContent: (state, action) => {
			state.content = action.payload;
			localStorage.setItem('editorContent', state.content); 
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		clearMessage: (state, _) => {
			state.message = null;
		},
		clear: (state, _) => {
			state.content = null;
			state.savedContent = null;
			state.backend = null;
			state.params = null;
			state.message = null;
		},
	},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchContentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.draft = action.payload;
				state.sceneIndex = 0;
      })
      .addCase(fetchContentAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      })
      .addCase(saveContentAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(saveContentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
				state.content = null;
				state.savedContent = action.payload();
      })
      .addCase(saveContentAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      });
	},
});


export const selectWordCount = (state) => {
	const content = state.content;
	if (content == null)
		return 0;
  const words = content.trim().split(/\s+/);
  const wordCount = words.length;
  return wordCount;
}

export const {
	setContent,
	setTitle,
	clear,
	clearMessage,
} = editorReducerSlice.actions;

export default editorReducerSlice.reducer;
