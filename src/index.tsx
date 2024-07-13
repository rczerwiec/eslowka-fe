import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {Provider} from "react-redux"
import { store } from './shared/store';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavBar from './shared/components/UI/NavBar';
import SideBar from './shared/components/UI/SideBar';
import FoldersPage from './views/Folders/FoldersPage';
import WordsInFolderPage from './views/Folders/WordsInFolderPage';

const router = createBrowserRouter([
  {
    path: "/folders",
    element: <FoldersPage/>,
  },
  {
    path: "/folders/words",
    element: <WordsInFolderPage/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <div className="flex flex-col h-screen">
      <NavBar></NavBar>
      <div className="flex h-full">
          <SideBar></SideBar>
          <RouterProvider router={router} />
      </div>
    </div>
    </Provider>
  </React.StrictMode>
);


