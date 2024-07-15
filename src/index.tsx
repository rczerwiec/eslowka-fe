import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//REDUX
import {Provider} from "react-redux"
import { store } from './shared/store';

//ROUTING
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//PAGES
import NavBar from './shared/components/UI/NavBar';
import SideBar from './shared/components/UI/SideBar';
import FoldersPage from './views/Folders/FoldersPage';
import WordsInFolderPage from './views/Folders/WordsInFolderPage';
import TrainingPage from './views/Folders/TrainingPage';
import WordTranslationTraining from './views/Folders/Trainings/WordTranslationTrainingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FoldersPage/>,
  },
  {
    path: "/folders",
    element: <FoldersPage/>,
  },
  {
    path: "/folders/words",
    element: <WordsInFolderPage/>,
  },
  {
    path: "/folders/training",
    element: <TrainingPage/>
  },
  {
    path: "/folders/training/play",
    element: <WordTranslationTraining/>
  }
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


