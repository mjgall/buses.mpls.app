import { combineReducers } from 'redux';
import selectorReducer from './selectorReducer';
import authReducer from './authReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  form: formReducer,
  selector: selectorReducer,
  auth: authReducer
});