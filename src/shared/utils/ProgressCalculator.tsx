import { IFolder, IWord } from "../store/slices/FolderSlice";

const ProgressCalculator = (folder : IFolder, oldWord: IWord, changeTo: number) => {
    //console.log(folder);
    let maxProgress = folder.words.length;
    let currentProgress = 0;
    folder.words.map(((word:IWord) => {
        console.log(word);
        console.log(oldWord);
        if(word.id === oldWord.id){
            console.log("XD")
            if(changeTo ===2){
                currentProgress +=1;
              }
              else if (changeTo ===1){
                currentProgress +=0.5;
              }
              else{
                currentProgress +=0;
              }
        }
        else{
            if(word.known ===2){
                currentProgress +=1;
              }
              else if (word.known ===1){
                currentProgress +=0.5;
              }
              else{
                currentProgress +=0;
              }
        }

    }))
    const percentage = ((100*currentProgress)/maxProgress);
    //console.log("mp",maxProgress);
    //console.log("cp",currentProgress);
    //console.log(percentage);

    return percentage;
}

export default ProgressCalculator