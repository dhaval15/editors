import { 
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import DraftApi from '../api/draftApi.ts'; 

export const fetchDraftAsync = createAsyncThunk('draft/fetchDraft', async (id) => {
  const response = await DraftApi.getDraft(id, true);
	console.log(response);
  return response;
});

const draftSlice = createSlice({
  name: 'draft',
  initialState: { data: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDraftAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchDraftAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDraftAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
	},
});

export default draftSlice.reducer;
