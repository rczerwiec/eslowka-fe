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
        <div className="text-lg font-inter font-bold">1.0.2 alpha</div>
          <div>
            <ul className="pl-2 text-sm font-inter">
              <li>Usunięte niezaimplementowane "puste strony", do czasu ich zaimplementowania</li>
            </ul>
          </div>
        <div className="text-lg font-inter font-bold">1.0.1 alpha</div>
          <div>
            <ul className="pl-2 text-sm font-inter">
              <li>"Twoje Foldery" i "Kolekcje Słowek" dodane do menu w responsywnej wersji aplikacji</li>
              <li>Menu rozwijane zamyka się po wybraniu danej opcji</li>
              <li>Dodana możliwość resetu hasła</li>
              <li>Dodana możliwość weryfikacji adresu email</li>
              <li>Dodana możliwość rejestracji z pomocą konta Google</li>
            </ul>
          </div>
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