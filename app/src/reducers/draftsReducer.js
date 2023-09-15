import { 
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import DraftApi from '../api/draftApi.ts'; 

export const fetchDraftsAsync = createAsyncThunk('drafts/fetchDrafts', async () => {
  const response = await DraftApi.getAllDrafts();
  return response;
});

export const createDraftAsync = createAsyncThunk('drafts/createDraft', async (draftData) => {
  const response = await DraftApi.createDraft(draftData);
  return {
		id: response,
		... draftData,
	};
});

export const updateDraftAsync = createAsyncThunk('drafts/updateDraft', async ({ id, draftData }) => {
  const response = await DraftApi.updateDraft(id, draftData);
  return response;
});

export const deleteDraftAsync = createAsyncThunk('drafts/deleteDraft', async (id) => {
  await DraftApi.deleteDraft(id);
  return id;
});

const draftsSlice = createSlice({
  name: 'drafts',
	initialState : {
		data: [],
		status: 'idle', 
		error: null,    
	},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDraftsAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchDraftsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDraftsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createDraftAsync.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload]; 
      })
      .addCase(updateDraftAsync.fulfilled, (state, action) => {
        const updatedDraft = action.payload;
        const index = state.data.findIndex((draft) => draft.id === updatedDraft.id);
        if (index !== -1) {
          state.data[index] = updatedDraft; 
        }
      })
      .addCase(deleteDraftAsync.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.data = state.data.filter((draft) => draft.id !== deletedId); 
      });
  },
});

export default draftsSlice.reducer;
