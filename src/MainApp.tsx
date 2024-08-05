import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import WordTranslationTraining from "./views/Folders/TrainingsPageview/WordTranslationTrainingPage";
import TrainingPage from "./views/Folders/TrainingsPageview/TrainingPage";
import WordsInFolderPage from "./views/Folders/WordsPageView/WordsInFolderPage";
import FoldersPage from "./views/Folders/FoldersPageView/FoldersPage";
import SideBar from "./shared/components/UI/SideBar";
import NavBar from "./shared/components/UI/NavBar";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebas";
import { useEffect } from "react";
import { getCurrentUser } from "./shared/store/slices/UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import App from "./App";

const MainApp = () => {
  console.log()
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LoginPage/>
      ),
    },
    {
      path: "/signup",
      element: (
        <SignUpPage/>
      ),
    },
    {
      path: "/login",
      element: (
        <LoginPage/>
      ),
    },
    {
      path: "/app",
      element: (
        <App>
        <FoldersPage/>
       </App>
      ),
    },
    {
      path: "/app/folders",
      element: (
       <App>
        <FoldersPage/>
       </App>
      ),
    },
    {
      path: "/app/folders/words",
      element: (
        <App>
        <WordsInFolderPage/>
       </App>
      ),
    },
    {
      path: "/app/folders/training",
      element: (
        <App>
        <TrainingPage/>
       </App>
      ),
    },
    {
      path: "/app/folders/training/play",
      element: (
        <App>
        <WordTranslationTraining/>
       </App>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainApp;