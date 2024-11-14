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
    { value: 'a1', label: 'A1' },
    { value: 'a2', label: 'A2' },
    { value: 'b1', label: 'B1' },
    { value: 'b2', label: 'B2' },
    { value: 'c1', label: 'C1' },
    { value: 'c2', label: 'C2' },
  ]

interface IProps{
  changeLangaugeState: (value: string) => void;
  changeLevelState: (value: string) => void;
}

function LanguageSelectorComponent({changeLevelState, changeLangaugeState}: IProps) {


    return (
      <div className="flex gap-2 border-solid border-b-2 px-4 pb-2">
        <Select
          placeholder="Wybierz język"
          options={languages}
          onChange={(option: SelectOptionType | null) => {if(option){
            changeLangaugeState(option.value)
          }}}
        ></Select>
        <Select
          placeholder="Wybierz poziom"
          options={levels}
          onChange={(option: SelectOptionType | null) => {if(option){
            changeLevelState(option.value)
          }}}
        ></Select>
        <>
          <div className="flex justify-center items-center text-base text-fifth">
            Strona 1
          </div>
          <div
            onClick={() => {}}
            className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <FaAngleLeft />
          </div>
          <div
            onClick={() => {}}
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