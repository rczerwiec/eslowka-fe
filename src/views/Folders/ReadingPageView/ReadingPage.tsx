import { useEffect, useState } from "react";
import PageTemplate from "../../../shared/components/PageTemplate";
import CreateOwnStoryComponent from "./Components/CreateOwnStoryComponent";
import LanguageSelectorComponent from "./Components/LanguageSelectorComponent";
import StoriesGridComponent from './Components/StoriesGridComponent';
import { RootState, useFetchUserStoriesQuery } from "../../../shared/store";
import { useSelector } from "react-redux";


function ReadingPage(){
    const user = useSelector((state: RootState) => state.userProfile);
    const response = useFetchUserStoriesQuery(user.value);
    const [language, setLanguage] = useState<string>("english");
    const [level, setLevel] = useState<string>("a1");


    let stories;
    if (response.isSuccess) {
      stories = response.data
        .map((story: any) => {
          return story;
        })
        .filter((story: any) => {
          if (story !== undefined) {
            console.log("story is definied");
            if (story.language !== undefined && story.level !== undefined) {
              console.log("language and level are definied");
              if (story.language === language && story.level === level) {
                console.log("Story langauge and level are selected");
                console.log(story.language, language);
                console.log(story.level, level);
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
    }
    console.log(stories);
    

    return(
        <PageTemplate firstTitle="Ćwicz Czytanie" mainTitle="Ćwicz Czytanie">
        <div className="relative inline-block text-left">
            <LanguageSelectorComponent changeLangaugeState={setLanguage} changeLevelState={setLevel}/>
            <StoriesGridComponent stories={stories}/>
            <CreateOwnStoryComponent level={level} language={language}/>
        </div>
      </PageTemplate>
    )
}

export default ReadingPage;