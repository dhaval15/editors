import { configureStore, getDefaultMiddleware, applyMiddleware } from '@reduxjs/toolkit';
import editorReducer from './reducers/editorReducer';
//import lookupReducer from './reducers/lookupReducer';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = configureStore({
  reducer: {
		editor: editorReducer,
    //lookup: lookupReducer,
  },
  middleware: [
		logger,
	],
});

export default store;
