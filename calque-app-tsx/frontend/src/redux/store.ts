
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
        ignoredPaths: ['persistor'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;


/*
Methods of the Redux Store (created using configureStore):

- getState()
  - Retrieves the all of the current states of the store.
  - Usage:   
  const state = getState();
  const userId = state.auth.userId;

- dispatch(action)
  - Dispatches an action to the store.
  - Usage: store.dispatch(action);

- subscribe(listener)
  - Adds a change listener that will be called any time an action is dispatched.
  - Usage: const unsubscribe = store.subscribe(listener);

- replaceReducer(nextReducer)
  - Replaces the current reducer with a new reducer.
  - Usage: store.replaceReducer(nextReducer);

- [Symbol.observable]()
  - Returns an observable of the store.
  - Usage: const observable = store[Symbol.observable]();

Additional Methods provided by Redux Toolkit:

- store.subscribe(() => saveState(store.getState()))
  - Custom method to save the state to local storage whenever the state changes.
  - Usage: store.subscribe(() => saveState(store.getState()));
*/
