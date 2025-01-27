import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import TrainingPage from "./views/Folders/TrainingsPageview/TrainingPage";
import WordsInFolderPage from "./views/Folders/WordsPageView/WordsInFolderPage";
import FoldersPage from "./views/Folders/FoldersPageView/FoldersPage";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import App from "./App";
import TextTraining from "./views/Folders/TrainingsPageview/Modes/TextTrainings/TextTraining";
import TextTrainingReversed from "./views/Folders/TrainingsPageview/Modes/TextTrainings/TextTrainingReversed";
import RulesPage from "./views/RulesPage";
import ContactPage from "./views/ContactPage";
import SettingsPage from "./views/SettingsPage";
import PaymentsPage from "./views/PaymentsPage";
import PremiumPage from "./views/PremiumPage";
import UpdatesPage from "./views/UpdatesPage/UpdatesPage";
import RankingPage from "./views/RankingPage";
import AIChatPage from "./views/AIChat/AIChatPage";
import ReadingPage from "./views/ReadingPageView/ReadingPage";
import HearTraining from "./views/Folders/TrainingsPageview/Modes/HearTrainings/HearTraining";
import HearTrainingReversed from "./views/Folders/TrainingsPageview/Modes/HearTrainings/HearTrainingReversed";
import LandingPage from "./views/LandingPage/LandingPage";
import CollectionsPage from './views/Collections/CollectionsPage';
import LandingPageRules from "./views/LandingPage/LandingPageRules";

const MainApp = () => {
  const router = createBrowserRouter([
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
      path: "/rules",
      element: (
        <LandingPageRules/>
      ),
    },
    {
      path: "/",
      element: (
        <LandingPage/>
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
      path: "/app/collections",
      element: (
       <App>
        <CollectionsPage/>
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
      path: "/rules",
      element: (
       <App>
        <LandingPageRules/>
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
        <TextTraining/>
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
        <TextTrainingReversed/>
       </App>
      ),
    },
    {
      path: "/app/folders/training/playHear",
      element: (
        <App>
        <HearTraining/>
       </App>
      ),
    },
    {
      path: "/app/folders/training/playHearReversed",
      element: (
        <App>
        <HearTrainingReversed/>
       </App>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainApp;