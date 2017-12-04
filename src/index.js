import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import store, { history, persistor } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
