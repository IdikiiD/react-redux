

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filterSlice';


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
    reducer: {heroes, filters},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
