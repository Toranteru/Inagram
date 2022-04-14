import { combineReducers, createStore } from 'redux';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  fileSlice: fileReducer
});

const store = createStore(rootReducer);
export default store;