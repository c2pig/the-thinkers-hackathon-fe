import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';

import loops, * as fromLoops from './loops';

const persistConfig = {
    key: 'root',
    storage: localForage,
};

export default persistCombineReducers(persistConfig, {
    routing: routerReducer,
    loops,
});

// Selector
export const getLoopsSearchKeywords = state => fromLoops.getSearchKeywords(state.loops);
export const getLoopsData = state => fromLoops.getData(state.loops);
