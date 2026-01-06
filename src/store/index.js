import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filterSlice';

import {apiSlice} from "../api/apiSlice";
import {applyMiddleware, combineReducers, configureStore} from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({type: action});
    }
    return next(action);
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;
//
//     store.dispatch = (action) => {
//         if(typeof action === 'string') {
//             return oldDispatch({type: action});
//         }
//         return oldDispatch(action);
//     }
//     return store;
//
// };


const store = configureStore({

    reducer: {heroes, filters,[apiSlice.reducerPath]: apiSlice.reducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
