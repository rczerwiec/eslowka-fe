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
  onGenerateStory?: () => void;
}

function LanguageSelectorComponent({changeLevelState, changeLangaugeState,setPage, page,availablePages, onGenerateStory}: IProps) {
    

    return (
      <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl p-6 mb-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Filtry */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="min-w-[180px]">
              <Select
                placeholder="Wybierz język"
                options={languages}
                onChange={(option: SelectOptionType | null) => {if(option){
                  changeLangaugeState(option.value)
                  setPage(1);
                }}}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '4px 8px',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#3b82f6'
                    }
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6b7280',
                    fontSize: '14px'
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999
                  })
                }}
                menuPortalTarget={document.body}
              />
            </div>
            <div className="min-w-[140px]">
              <Select
                placeholder="Wybierz poziom"
                options={levels}
                onChange={(option: SelectOptionType | null) => {if(option){
                  changeLevelState(option.value)
                  setPage(1);
                }}}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '4px 8px',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#3b82f6'
                    }
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6b7280',
                    fontSize: '14px'
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999
                  })
                }}
                menuPortalTarget={document.body}
              />
            </div>
          </div>

          {/* Wyszukiwarka */}
          <div className="w-full lg:w-auto">
            <input 
              className="w-full lg:w-64 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none text-sm" 
              placeholder="Wyszukaj historie..." 
              type="text"
            />
          </div>

          {/* Przycisk generowania historii */}
          <div className="w-full lg:w-auto">
            <button
              onClick={onGenerateStory}
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondarylight text-white font-semibold px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
            >
              <span>✨</span>
              <span>Wygeneruj historię</span>
            </button>
          </div>

          {/* Nawigacja */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center text-sm text-gray-600 font-medium">
              Strona {page} z {availablePages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if(page > 1){
                    setPage(page-1)
                  }
                }}
                disabled={page <= 1}
                className="flex items-center justify-center w-10 h-10 bg-secondary text-white rounded-xl hover:bg-secondarylight disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={() => {
                  if (page < availablePages) setPage(page + 1);
                }}
                disabled={page >= availablePages}
                className="flex items-center justify-center w-10 h-10 bg-secondary text-white rounded-xl hover:bg-secondarylight disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LanguageSelectorComponent;