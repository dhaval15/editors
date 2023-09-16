import { configureStore, getDefaultMiddleware, applyMiddleware } from '@reduxjs/toolkit';
import draftsReducer from './reducers/draftsReducer';
import draftReducer from './reducers/draftReducer';
import editSceneReducer from './reducers/editSceneReducer';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = configureStore({
  reducer: {
    drafts: draftsReducer,
    draft: draftReducer,
    editScene: editSceneReducer,
  },
  middleware: [
		... getDefaultMiddleware(), 
		logger,
	],
});

export default store;
