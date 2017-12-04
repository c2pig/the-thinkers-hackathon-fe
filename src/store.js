import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'store/modules';

export const history = createHistory({
    forceRefresh: false,
});

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, undefined, composedEnhancers);

export let persistor = persistStore(store);
export default store;
