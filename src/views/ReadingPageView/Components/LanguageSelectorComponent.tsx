import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Select from "react-select";

interface SelectOptionType { label: string, value: string }

const languages = [
    { value: 'german', label: 'Niemiecki' },
    { value: 'english', label: 'Angielski' },
    { value: 'french', label: 'Francuski' },
    { value: 'russian', label: 'Rosyjski' },
    { value: 'japan', label: 'Japoński' },
  ]

const levels = [
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
  ]

interface IProps{
  changeLangaugeState: (value: string) => void;
  changeLevelState: (value: string) => void;
  setPage: (value: number) => void;
  page: number;
  availablePages: number;
}

function LanguageSelectorComponent({changeLevelState, changeLangaugeState,setPage, page,availablePages}: IProps) {
    

    return (
      <div className="flex gap-2 border-solid border-b-2 px-4 pb-2">
        <Select
          placeholder="Wybierz język"
          options={languages}
          onChange={(option: SelectOptionType | null) => {if(option){
            changeLangaugeState(option.value)
            setPage(1);
          }}}
        ></Select>
        <Select
          placeholder="Wybierz poziom"
          options={levels}
          onChange={(option: SelectOptionType | null) => {if(option){
            changeLevelState(option.value)
            setPage(1);
          }}}
        ></Select>
        <>
          <div className="flex justify-center items-center text-base text-fifth">
            Strona {page}
          </div>
          <div
            onClick={() => {
              if(page > 1){
                setPage(page-1)
              }
            }}
            className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <FaAngleLeft />
          </div>
          <div
            onClick={() => {
              console.log(availablePages);
              if (page < availablePages) setPage(page + 1);}}
            className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <FaAngleRight />
          </div>
        </>
        <input className="border-solid border-2 rounded-xl p-1" placeholder="Wyszukaj..." type="text"></input>
      </div>
    );
}

export default LanguageSelectorComponent;