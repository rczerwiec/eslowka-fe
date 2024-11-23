import { useEffect, useState } from "react";
import CreateOwnStoryComponent from "./Components/CreateOwnStoryComponent";
import LanguageSelectorComponent from "./Components/LanguageSelectorComponent";
import StoriesGridComponent from './Components/StoriesGridComponent';
import { useSelector } from "react-redux";
import { RootState, useFetchUserStoriesQuery, useUpdateStoryWordMutation } from "../../shared/store";
import PageTemplate from "../../shared/components/PageTemplate";
import { IStory } from "../../shared/store/slices/UserSlice";
import AIWordModal from "../AIChat/AIWordModal";
import useModal from "../../shared/components/Modal/useModal";


function ReadingPage(){
    const [page, setPage] = useState(1);
    const [availablePages, setAvailablePages] = useState(1);
    const user = useSelector((state: RootState) => state.userProfile);
    const response = useFetchUserStoriesQuery(user.value);
    //level and language for selector
    const [language, setLanguage] = useState<string>();
    const [level, setLevel] = useState<string>();
    const StoryModal = useModal();
    //selected story
    const [selectedStory, setSelectedStory] = useState<IStory>()
    //right clicked word
    const [selectedWord, setSelectedWord] = useState("");

    //update word in story
    const [updateWord] = useUpdateStoryWordMutation();


    let stories;
    let allStories;
    if (response.isSuccess) {
      allStories = response.data;
      stories = response.data
        .map((story: any) => {
          return story;
        })
        .filter((story: any) => {
          if (story !== undefined) {
            //console.log("story is definied");
            if (story.language !== undefined && story.level !== undefined) {
              console.log("language and level are definied");
              if (language === undefined && level === undefined) {
                return true;
              } 
              else if(language !== undefined && level === undefined) {
                if(story.language === language) {
                  return true;
                }
              }
              else if(language === undefined && level !== undefined) {
                if(story.level === level) {
                  return true;
                }
              }
              else {
                if (story.language === language && story.level === level) {
                  //console.log("Story langauge and level are selected");
                  //console.log(story.language, language);
                  //console.log(story.level, level);
                  return true;
                } else {
                  return false;
                }
              }
            } else {
              return true;
            }
          } else {
            return false;
          }
        });
    }

    let knownWords = selectedStory?.words.filter((word)=>{
      if(word.known > 0){
        return true;
      }
      else{
        return false;
      }
    })
    let knownWordsLength = knownWords?.length
    let percentage = 0.0
    if(knownWordsLength && selectedStory){
        percentage = knownWordsLength/selectedStory.words.length
    }
    

    return (
      <>
        <PageTemplate firstTitle="Ćwicz Czytanie" mainTitle="Ćwicz Czytanie" backButton={true} childrenButton={            <button className="flex items-center text-xl bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
                onClick={() => {
                  setSelectedStory(undefined);
                }}
              >
                Wróć
              </button>}>
          {selectedStory === undefined ? (
            <div className="relative inline-block text-left">
              <LanguageSelectorComponent
                changeLangaugeState={setLanguage}
                changeLevelState={setLevel}
                setPage={setPage}
                page={page}
                availablePages={availablePages}
              />
              <StoriesGridComponent
                stories={stories}
                onStorySelect={setSelectedStory}
                page={page}
                setAvailablePages={setAvailablePages}
              />
              <CreateOwnStoryComponent
                level={level}
                language={language}
                allStories={allStories}
              />
            </div>
          ) : (
            <div>
              <div className="flex flex-col gap-4 m-4 p-4 bg-secondarylight rounded-xl font-inter">
                <div className="flex justify-between">
                  <div className="font-bold">
                    Tytuł: {selectedStory.title} ({selectedStory.level})
                  </div>
                  <div className="flex justify-center items-center gap-2 font-bold">
                    <div>{knownWordsLength}/{selectedStory.words.length}</div>
                    <progress className="rounded-xl" value={percentage} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 border p-4 rounded-xl bg-white">
                  {selectedStory.words.map((word, index) => {
                    let bgColor = "bg-green-400";
                    if (word.known === 0) {
                      bgColor = "";
                    } else if (word.known === 2) {
                      bgColor = "bg-orange-400";
                    } else if (word.known === 3) {
                      bgColor = "bg-red-600";
                    }

                    return (
                      <div
                        className={"p-1 " + bgColor}
                        onClick={(e) => {
                          e.preventDefault();
                          //IF YOU KNOW THE WORD
                          console.log(word.known);
                          updateWord({
                            userID: user.value,
                            storyID: selectedStory.id,
                            storyWordID: word.id,
                            word: word,
                          });
                          if (word.known === 0) {
                            const updatedStoryWords = selectedStory.words.map(
                              (w) => (w.id === word.id ? { ...w, known: 1 } : w)
                            );

                            setSelectedStory({
                              ...selectedStory,
                              words: updatedStoryWords,
                            });
                          } else if (word.known === 1) {
                            const updatedStoryWords = selectedStory.words.map(
                              (w) => (w.id === word.id ? { ...w, known: 2 } : w)
                            );
                            setSelectedStory({
                              ...selectedStory,
                              words: updatedStoryWords,
                            });
                          } else if (word.known === 2) {
                            const updatedStoryWords = selectedStory.words.map(
                              (w) => (w.id === word.id ? { ...w, known: 3 } : w)
                            );
                            setSelectedStory({
                              ...selectedStory,
                              words: updatedStoryWords,
                            });
                          } else if (word.known === 3) {
                            const updatedStoryWords = selectedStory.words.map(
                              (w) => (w.id === word.id ? { ...w, known: 0 } : w)
                            );
                            setSelectedStory({
                              ...selectedStory,
                              words: updatedStoryWords,
                            });
                          }
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          //IF YOU DON'T KNOW THE WORD
                          setSelectedWord(word.word);
                          StoryModal.toggleModal();
                        }}
                      >
                        {word.word}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </PageTemplate>
        <AIWordModal
          isVisible={StoryModal.isVisible}
          onClose={StoryModal.closeModal}
          word={selectedWord}
        />
      </>
    );
}

export default ReadingPage;