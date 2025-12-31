import {createStore, compose} from 'redux';
import { thunk } from 'redux-thunk'
import heroes from '../reducers/hero.js';
import filters from '../reducers/filter.js';


import {applyMiddleware, combineReducers} from "@reduxjs/toolkit";

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


const store = createStore(
    combineReducers({heroes, filters}),
    compose(
        applyMiddleware(thunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;
