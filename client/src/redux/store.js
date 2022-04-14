import { combineReducers, createStore } from 'redux';
import postReducer from './postReducer';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
  postSlice: postReducer,
  imageSlice: imageReducer
});

const store = createStore(rootReducer);
export default store;