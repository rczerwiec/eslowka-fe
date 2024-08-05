import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//REDUX
import {Provider} from "react-redux"
import { store } from './shared/store';

//PAGES
import MainApp from './MainApp';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <MainApp></MainApp>
    </Provider>
  </React.StrictMode>
);


