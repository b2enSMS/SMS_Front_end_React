import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();
const store = createStore(rootReducer,applyMiddleware(logger,ReduxThunk));
ReactDOM.render(
<Provider store= {store}>
    <Root /> 
</Provider>
, document.getElementById('root'));
serviceWorker.unregister();
