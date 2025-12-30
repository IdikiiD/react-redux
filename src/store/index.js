import { createStore } from 'redux';

import heroes from '../reducers/hero.js';
import filters from '../reducers/filter.js';

import {combineReducers} from "@reduxjs/toolkit";


const store = createStore(combineReducers({heroes,filters}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;