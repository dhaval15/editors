import { 
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';

export const reverseLookup = createAsyncThunk('lookup/reverse', async (_, thunkApi) => {
	const searchTerm = thunkApi.getState().lookup.searchTerm;
  const response = await fetch(`https://api.datamuse.com/words?ml=${searchTerm}&md=d`);
  const data = await response.json();
  return data.slice(0, 10);
});

const lookupSlice = createSlice({
  name: 'lookup',
	initialState : {
		searchTerm: '',
		results: [],
		isLoading: false,
	},
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload
		},
		clearResults: (state, action) => {
			state.searchTerm = ''
			state.results = []
			state.isLoading = false
		},
	},
  extraReducers: (builder) => {
    builder
      .addCase(reverseLookup.pending, (state) => {
        state.status = 'pending';
				state.isLoading = true;
      })
      .addCase(reverseLookup.fulfilled, (state, action) => {
        state.status = 'succeeded';
				state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(reverseLookup.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      });
	},
});

export const {
	clearResults,
	setSearchTerm,
} = lookupSlice.actions;

export default lookupSlice.reducer;
