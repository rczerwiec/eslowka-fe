interface IProps{
  stories?: any;
}


function StoriesGridComponent({stories}:IProps) {
  let renderedStories;
  if (stories) {
    if (stories.length > 0) {
      renderedStories = stories.map((story: any) => {
        // let storyWords = story.words.map((word: any, index: number) => {
        //   if (word.word != "") {
        //     let bgColor = ""
        //     if(word.known === false){
        //       bgColor = "bg-green-400"
        //     }

        //     return (
        //       <span
        //         onClick={() => {}}
        //         className={"hover:bg-secondary hover:p-1 py-1 cursor-pointer rounded-xl flex-none "+bgColor}
        //       >
        //         {word.word}
        //       </span>
        //     );
        //   }
        // });
        return (
          <div className="shadow-lg min-h-60 hover:bg-fourth hover:cursor-pointer rounded-lg m-2">
            <div className="bg-secondarylight text-main font-bold text-xl p-2 text-center rounded-t-lg">
              {story.title}
            </div>
            <div className="flex flex-col text-base p-2 text-left text-black font-thin">
              <span className="flex flex-wrap flex-col gap-1">
                Tutaj będzie opis tej historii...
              </span>
              <span>
                {story.language}
              </span>
              <span>
                {story.level}
              </span>
            </div>
          </div>
        );
      });
    } else {
      renderedStories = <div>Brak historii do wyświetlenia.</div>;
    }
  }

  return (
    <div className="grid grid-cols-5 grid-rows-2 border-solid border-b-2 px-4 font-inter pt-2 gap-2">
      {renderedStories}
    </div>
  );
}

export default StoriesGridComponent;
