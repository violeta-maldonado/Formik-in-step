import { combineReducers } from '@reduxjs/toolkit';
import { reducer as dataUserReducer } from '../slices/data-user';


export const rootReducer = combineReducers({
  dataUser: dataUserReducer
});
