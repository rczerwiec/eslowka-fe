import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import TrainingPage from "./views/Folders/TrainingsPageview/TrainingPage";
import WordsInFolderPage from "./views/Folders/WordsPageView/WordsInFolderPage";
import FoldersPage from "./views/Folders/FoldersPageView/FoldersPage";
import SideBar from "./shared/components/UI/SideBar";
import NavBar from "./shared/components/UI/NavBar/NavBar";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebas";
import { useEffect } from "react";
import { getCurrentUser } from "./shared/store/slices/UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import App from "./App";
import TranslationWordTraining from "./views/Folders/TrainingsPageview/TranslationTrainingPage";
import WordsCollectionsPage from "./views/Folders/WordsCollectionPageView/WordsCollectionsPage";
import RulesPage from "./views/RulesPage";
import ContactPage from "./views/ContactPage";
import SettingsPage from "./views/SettingsPage";
import PaymentsPage from "./views/PaymentsPage";
import PremiumPage from "./views/PremiumPage";
import FrontPage from "./views/FrontPage";
import UpdatesPage from "./views/UpdatesPage/UpdatesPage";
import RankingPage from "./views/RankingPage";
import RevTranslationTraining from "./views/Folders/TrainingsPageview/RevTranslationTrainingPage";
import AIChatPage from "./views/AIChat/AIChatPage";
import ReadingPage from "./views/Folders/ReadingPageView/ReadingPage";

const MainApp = () => {
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
      path: "/app/collections",
      element: (
       <App>
        <WordsCollectionsPage/>
       </App>
      ),
    },
    {
      path: "/app/rules",
      element: (
       <App>
        <RulesPage/>
       </App>
      ),
    },
    {
      path: "/app/contact",
      element: (
       <App>
        <ContactPage/>
       </App>
      ),
    },
    {
      path: "/app/settings",
      element: (
       <App>
        <SettingsPage/>
       </App>
      ),
    },
    {
      path: "/hello",
      element: (
        <FrontPage/>
      ),
    },
    {
      path: "/app/payments",
      element: (
       <App>
        <PaymentsPage/>
       </App>
      ),
    },
    {
      path: "/app/premium",
      element: (
       <App>
        <PremiumPage/>
       </App>
      ),
    },
    {
      path: "/app/updates",
      element: (
       <App>
        <UpdatesPage/>
       </App>
      ),
    },
    {
      path: "/app/ranking",
      element: (
       <App>
        <RankingPage/>
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
      path: "/app/read",
      element: (
        <App>
        <ReadingPage/>
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
        <TranslationWordTraining/>
       </App>
      ),
    },
    {
      path: "/app/ai",
      element: (
        <App>
        <AIChatPage/>
       </App>
      ),
    },
    {
      path: "/app/folders/training/playReversed",
      element: (
        <App>
        <RevTranslationTraining/>
       </App>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainApp;