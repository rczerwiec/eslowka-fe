import Papa from "papaparse";

interface CsvFileInputInterface{
    onFileLoad: any;
}

const CsvFileInput = ({ onFileLoad }:CsvFileInputInterface) => {
    const handleFileChange = (e:any) => {
      const file = e.target.files[0];
      
      if (file) {
        Papa.parse(file, {
          complete: (result) => {
            onFileLoad(result.data);
          },
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
      }
    };
    return (
      <div className="flex flex-col  p-2 justify-center font-bold items-center shadow-lg mx-2 rounded-xl text-sm font-inter bg-white z-10 border-secondary border-y-2 border-x-2 max-lg:hidden">
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white" htmlFor="file_input">Importuj Swoje Słówka</label>
        <input onChange={handleFileChange} className="block bg-secondary w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
        </input>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Tylko plik CSV</p>
      </div>
    );
  };
  export default CsvFileInput;


        


