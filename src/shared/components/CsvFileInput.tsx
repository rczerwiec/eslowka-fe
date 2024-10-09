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
      <div className="flex flex-col text-xl items-center text-center justify-center bg-secondary rounded-xl p-2 m-4 z-20 shadow-lg">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Importuj Swoje Słówka</label>
        <input onChange={handleFileChange} className="block bg-secondary w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
        </input>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Tylko plik CSV</p>
      </div>
    );
  };
  export default CsvFileInput;


        


