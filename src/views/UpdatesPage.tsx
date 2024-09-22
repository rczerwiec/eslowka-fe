const UpdatesPage = () => {
    return (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                                    text-fifth text-sm font-medium"
        >
          Aktualizacje
        </div>
        <div
          className="flex pl-4 h-20 items-center
                                    text-black text-3xl font-medium"
        >
          Aktualizacje
        </div>
        <div className="relative inline-block text-left pl-4">
          <div className="text-lg font-inter font-bold">1.0.0 alpha</div>
          <div>
            <ul className="pl-2 text-sm font-inter">
              <li>Dodana informacja o wersji</li>
              <li>Usprawniona responsywność dla urządzeń mobilnych</li>
              <li>Naprawiony system rejestracji</li>
              <li>Dodana zakładka "Aktualizacje"</li>
              <li>Title zmieniony z "React App" na "ESłówka"</li>
              <li>Dodany opis w metatagach</li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default UpdatesPage;