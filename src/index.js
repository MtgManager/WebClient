import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const rootRender = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(rootRender, document.getElementById('root'));

registerServiceWorker();
