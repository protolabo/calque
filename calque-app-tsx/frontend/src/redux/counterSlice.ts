import { createSlice } from '@reduxjs/toolkit';


//our slices contain all the actions / reducers 
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    reset: (state) => { state.value = 0; },
  },
});

//Remember that state changes are immutables, so a new instance replaces the previous in the store (Immer architecture)
//upon modification of the store, we emit a rerender event to the subscribers of the state (those connected via useSelector)

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;



/*
How to use in a component :


1. Imports : 

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../redux/counterSlice';

2. Get state

  const counter = useSelector(state => state.counter.value); //hook from react-redux for react components to access the state value
  const dispatch = useDispatch(); //store's dispatcher will find the right action when called

3. Implement logic

      <h2>  Counter: {counter}  </h2>
      <button onClick={ () => dispatch(increment()) }>  Increment  </button> 

*/