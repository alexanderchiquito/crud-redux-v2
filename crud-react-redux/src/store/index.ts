import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/Slice';

const persistanceLocalStoregeMiddeleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  }

export const store = configureStore({
    reducer:{
        users: usersReducer,
    },

    middleware: [persistanceLocalStoregeMiddeleware]
    
})

export type RootSate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch