import { combineReducers } from 'redux';
import counterReducer from './counterSlice';



//combines all the reducers to be integrated in our store.ts

const rootReducer = combineReducers({
  counter: counterReducer,
 // auth: authReducer,
 // api: apiReducer,
});

export default rootReducer;
