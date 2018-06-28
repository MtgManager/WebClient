// Import core redux functionality
import { snackbarReducer } from 'react-redux-snackbar';
import { combineReducers, createStore } from 'redux';
import main from './reducers/main.reducer';

// Export the store, made of all the reducers combined
export default createStore(combineReducers({
  main,
  snackbar: snackbarReducer,
}));
