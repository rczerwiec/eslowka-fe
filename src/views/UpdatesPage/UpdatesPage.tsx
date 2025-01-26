import MainTitle from '../../shared/components/MainTitle';
import FirstTitle from '../../shared/components/FirstTitle';
import VersionList from "./components/VersionList";

const UpdatesPage = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-50 p-6 font-inter">
      {/* Page Titles */}
      <FirstTitle>Aktualizacje</FirstTitle>
      <MainTitle>Aktualizacje</MainTitle>

      {/* Updates List */}
      <div className="relative overflow-y-auto max-h-[70vh] mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <VersionList version="1.13.1 alpha">
        <h1 className='text-xl font-bold'>Poprawki</h1>
        <li>-Naprawiony błąd znikającego paska statystyk na urządzeniach IOS</li>
        <li>-Poprawione menu na stronie głównej</li>
        <li>-Poprawione wychodzące poza ekran karty folderów</li>
      </VersionList>
      <VersionList version="1.13.0 alpha - UI fixes">
        <h1 className='text-xl font-bold'>Poprawki</h1>
        <li>-Poprawione liczne błęd UI</li>
        <li>-Poprawiony błąd z klawiaturą na urządzeniach mobilnych, która psuje UI</li>
      </VersionList>
      <VersionList version="1.12.0 alpha - UI & Responsive update">
        <h1 className='text-xl font-bold'>Zmiany</h1>
        <li>-Zmienione całkowite UI strony</li>
        <li>-Responsywność strony</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
        <li>-Poprawione liczne błędy</li>
      </VersionList>
      <VersionList version="1.11.0 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
        <li>-Zwiększony limit nazwy folderu do 40 znaków</li>
        <li>-Dodana możliwośc usuwania historyjek</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
        <li>-Poprawione błędy z kopiowaniem poprzez kod referencyjny</li>
      </VersionList>
      <VersionList version="1.10.0 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
          <li>-Dodane logo w lewym górnym rogu aplikacji</li>
          <li>-Cennik dodany również do zakładki "Premium"</li>
          <li>-Dodana możliwość przejścia do ćwiczeń bezpośrednio z folderu ze słówkami</li>
          <li>-Podczas tworzenia konta, tworzy się również domyślny folder i domyślne historyjki</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
        <li>-Kliknięcie na logo w aplikacji przenosi teraz do strony głównej</li>
        <li>-Poprawiona kolorystyka na stronie landingowej</li>
        <li>-Poprawione liczne literówki na stronie landingowej</li>
        <li>-Zabezpieczenia chatu AI</li>
        <li>-Zabezpieczenia historyjek</li>
        <li>-Poprawione błędy ui</li>
        <li>-Poprawione błędy na stronie ustawień</li>
        <li>-Po wylogowaniu aplikacja nie wyrzuca już na stronę główną</li>
      </VersionList>
      <VersionList version="1.9.0 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
          <li>-W folderze słówek poprawione UI prawego panelu</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
          <li>-W folderze słówek dodana dostępna ilość stron</li>
          <li>-W folderze słówek została powiększona długość znaków w słówkach</li>
          <li>-W folderze słówek przycisk udostępniania numeru referencyjnego już działa!</li>
          <li>-Zakładka "Ćwicz Czytanie", dostępna w responsywnej wersji aplikacji!</li>
          <li>-Jeśli jesteś w oknie logowania lub rejestracji, to jeśli jesteś zalogowany - aplikacja automatycznie Cię przeniesie do głównej strony aplikacji!</li>
          <li>-Jeśli jesteś w oknie aplikacji, to jeśli nie jesteś zalogowany - aplikacja automatycznie Cię przeniesie do okna logowania!</li>
      </VersionList>
      <VersionList version="1.8.0 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
          <li>-Utworzona pierwsza wersja strony produktu</li>
          <li>-Możliwość edycji nazwy folderu poprzez dwukrotne kliknięcie myszką na nazwe (będąc w danym folderze)</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
          <li>-Drobne zmiany wizualne w Chat AI</li>
          <li>-Optymalizacja backendu aplikacji</li>
          <li>-Optymalizacja api aplikacji</li>
      </VersionList>
      <VersionList version="1.7.0 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
          <li>-Logo dodane do strony logowania i rejestracji.</li>
          <li>-Generowanie historyjek przeniesione do osobnego modala.</li>
          <li>-Dodana możliwość wprowadzenia własnego tytułu w historyjkach.</li>
          <li>-Zmieniony wygląd historyjek (kart historyjek).</li>
          <li>-Dodane nowe tryby ćwiczeń - ze słuchu.</li>
          <li>-Dodana możliwość udostępniania swoich zbiorów innym - poprzez kod referencyjny.</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
          <li>-Poprawione przełączenia między stronami w historyjkach</li>
          <li>-Progress bar w wybranej historyjce już działa </li>
      </VersionList>
      <VersionList version="1.6.0 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
          <li>-Ćwicz Czytanie - dodana możliwość tworzenia własnych czytanek i uczenia się z nich</li>
          <li>-Dodane animacje do niektórych komponentów</li>
          <li>-Dodane potwierdzenie hasła podczas rejestracji</li>
          <li>-Liczne zabezpieczenia</li>
          <li>-Chat AI - od teraz zapamiętuje historię rozmowy, do czasu wylogowania</li>
          <li>-Chat AI - więcej operacji na wybranym słowie</li>
          <li>-Zwiększony limit poziomów z 10 do 20</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
          <li>-Przebudowany system logowania</li>
          <li>-Poprawki wydajnościowe</li>
          <li>-Naprawiony błąd, który nie zaliczał ćwiczenia mimo poprawnej odpowiedzi</li>
          <li>-Naprawiony błąd, który naliczał podwójnie słówka podcza importu</li>
      </VersionList>
      <VersionList version="1.5.0 alpha">
          <li>-Dodana możliwość edycji słówek poprzez kliknięcie na nie</li>
          <li>-Poprawiona responsywność strony</li>
          <li>-Refaktoryzacja kodu źródłowego</li>
          <li>-Naprawiony błąd z naliczaniem dni - od teraz nalicza od 1</li>
          <li>-Chat AI od teraz zapamiętuje kontekst</li>
          <li>-Chat AI - Bot Czarek jest teraz nastawiony pod naukę języków</li>
          <li>-Chat AI - Klikając na dane słówko możesz je z automatu dodać do folderu</li>
          <li>-Chat AI - Zmieniony wygląd bota</li>
          <li>-Poprawiony wygląd menu ustawień</li>
          <li>-Poprawiony ranking</li>
        </VersionList>
        <VersionList version="1.4.0 alpha">
          <li>-Dodana możliwość zmiany nazwy użytkownika</li>
          <li>-Dodano więcej informacji do ustawień</li>
          <li>-Dodana funkcjonalność streaku dni</li>
          <li>-Zmiana wizualna informacji o poziomie i XP</li>
          <li>-Dodana możliwość eksportu folderu słówek do pliku CSV</li>
          <li>-Dodana możliwość importu folderu słówek z pliku CSV</li>
          <li>-Poprawiona możliwość kliknięcia w folder</li>
          <li>-Dodana pierwsza wersja Chatu z AI</li>
        </VersionList>
        <VersionList version="1.3.0 alpha">
          <li>-Dodane zostało logo</li>
          <li>
            -Dodany system zdobywania doświadczenia oraz pierwsze 10 poziomów
          </li>
          <li>-Dodano ranking użytkowników</li>
          <li>-Refaktoryzacja kodu źródłowego</li>
        </VersionList>

        <VersionList version="1.2.0 alpha">
          <li>
            -Usunięte niezaimplementowane "puste strony", do czasu ich
            zaimplementowania
          </li>
          <li>-Naprawiono błędy z tworzeniem słówek (błąd ID)</li>
          <li>
            -Naprawiono błąd z brakującymi słowami w folderach (wyświetlaniem
            ich)
          </li>
        </VersionList>
        <VersionList version="1.1.0 alpha">
          <li>
            -"Twoje Foldery" i "Kolekcje Słowek" dodane do menu w responsywnej
            wersji aplikacji
          </li>
          <li>-Menu rozwijane zamyka się po wybraniu danej opcji</li>
          <li>-Dodana możliwość resetu hasła</li>
          <li>-Dodana możliwość weryfikacji adresu email</li>
          <li>-Dodana możliwość rejestracji z pomocą konta Google</li>
        </VersionList>
        <VersionList version="1.0.0 alpha">
          <li>-Dodana informacja o wersji</li>
          <li>-Usprawniona responsywność dla urządzeń mobilnych</li>
          <li>-Naprawiony system rejestracji</li>
          <li>-Dodana zakładka "Aktualizacje"</li>
          <li>-Title zmieniony z "React App" na "ESłówka"</li>
          <li>-Dodany opis w metatagach</li>
        </VersionList>
      </div>
    </div>
  );
};

export default UpdatesPage;
