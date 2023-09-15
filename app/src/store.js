import { configureStore } from '@reduxjs/toolkit';
import draftsReducer from './reducers/draftsReducer';
import draftReducer from './reducers/draftReducer';

const store = configureStore({
  reducer: {
    drafts: draftsReducer,
    draft: draftReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
