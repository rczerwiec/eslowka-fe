import MainTitle from '../../shared/components/MainTitle';
import FirstTitle from '../../shared/components/FirstTitle';
import VersionList from "./components/VersionList";

const UpdatesPage = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <FirstTitle>Aktualizacje</FirstTitle>
      <MainTitle>Aktualizacje</MainTitle>
      <div className="relative inline-block text-left pl-4 overflow-y-scroll max-h-[660px]">
      <VersionList version="1.0.8 alpha">
        <h1 className='text-xl font-bold'>Zmiany</h1>
          <li>-Możliwość edycji nazwy folderu poprzez dwukrotne kliknięcie myszką na nazwe (będąc w danym folderze)</li>
        <h1 className='text-xl font-bold'>Poprawki</h1>
          <li>-Drobne zmiany wizualne w Chat AI</li>
          <li>-Optymalizacja backendu aplikacji</li>
          <li>-Optymalizacja frontendu aplikacji</li>
      </VersionList>
      <VersionList version="1.0.7 alpha">
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
      <VersionList version="1.0.6 alpha">
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
      <VersionList version="1.0.5 alpha">
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
        <VersionList version="1.0.4 alpha">
          <li>-Dodana możliwość zmiany nazwy użytkownika</li>
          <li>-Dodano więcej informacji do ustawień</li>
          <li>-Dodana funkcjonalność streaku dni</li>
          <li>-Zmiana wizualna informacji o poziomie i XP</li>
          <li>-Dodana możliwość eksportu folderu słówek do pliku CSV</li>
          <li>-Dodana możliwość importu folderu słówek z pliku CSV</li>
          <li>-Poprawiona możliwość kliknięcia w folder</li>
          <li>-Dodana pierwsza wersja Chatu z AI</li>
        </VersionList>
        <VersionList version="1.0.3 alpha">
          <li>-Dodane zostało logo</li>
          <li>
            -Dodany system zdobywania doświadczenia oraz pierwsze 10 poziomów
          </li>
          <li>-Dodano ranking użytkowników</li>
          <li>-Refaktoryzacja kodu źródłowego</li>
        </VersionList>

        <VersionList version="1.0.2 alpha">
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
        <VersionList version="1.0.1 alpha">
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
