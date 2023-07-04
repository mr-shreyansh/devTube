import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import {  persistor, store} from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
  <PersistGate persistor={persistor}>
    {console.log(store.getState())}
    <App />
    </PersistGate>
    </Provider>
);

