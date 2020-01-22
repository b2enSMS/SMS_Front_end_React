import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { tempSetUser, requestCheck } from './modules/auth/user'
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));

function loadUser() {
    try {
        const user = localStorage.getItem('user');
        if (!user) return;

        store.dispatch(tempSetUser(user));
        store.dispatch(requestCheck(user));
    } catch (e) {
        console.log('localStorage 작동 안함')
    }
}

loadUser();

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
