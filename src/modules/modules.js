import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';

import loops, * as fromLoops from './loops';
import loopList, * as fromLoopList from './loopList';

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['loops'],
};

export default persistCombineReducers(persistConfig, {
    routing: routerReducer,
    loops,
    loopList,
});

// Selector
export const getLoopsData = state => {console.log(state); return fromLoops.getData(state.loops)};

export const getLoopListSearchKeywords = state => fromLoopList.getSearchKeywords(state.loopList);
export const getLoopListIds = state => fromLoopList.getIds(state.loopList);
export const getLoopListData = state => {
    console.log(state);
    const loopsData = getLoopsData(state);
    return getLoopListIds(state).map(id => loopsData[id] || {});
}
