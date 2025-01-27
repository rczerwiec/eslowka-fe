import FirstTitle from "../../shared/components/FirstTitle";
import MainTitle from "../../shared/components/MainTitle";
import Footer from "./components/Footer";
import LP_Navbar from "./components/LP_Navbar";

const LandingPageRules = () => {
  return (
    <div className="bg-gradient-to-r from-gradient_from to-gradient_to font-inter">
      {/* Nawigacja */}
      <LP_Navbar />

      {/* Główna zawartość */}
      <div className="max-w-7xl mx-auto pt-20 px-6 space-y-20">
        <div className="relative overflow-y-auto max-h-[70vh] mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mt-4">1. Postanowienia ogólne</h2>
        <p className="text-gray-700 mt-2">
          1.1. Niniejszy regulamin określa zasady korzystania z aplikacji Esłówka (zwanej dalej "Aplikacją").
        </p>
        <p className="text-gray-700 mt-2">
          1.2. Administratorem Aplikacji jest Radosław Czerwiec z siedzibą w Czciradz 31a/7, tel: 608578455 (zwana dalej "Administratorem").
        </p>
        <p className="text-gray-700 mt-2">
          1.3. Korzystając z Aplikacji, Użytkownik potwierdza akceptację niniejszego Regulaminu.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">2. Definicje</h2>
        <p className="text-gray-700 mt-2">
          2.1. <strong>Aplikacja</strong> – platforma edukacyjna Esłówka, dostępna przez stronę internetową i/lub aplikacje mobilne.
        </p>
        <p className="text-gray-700 mt-2">
          2.2. <strong>Użytkownik</strong> – osoba fizyczna lub prawna korzystająca z Aplikacji.
        </p>
        <p className="text-gray-700 mt-2">
          2.3. <strong>Konto</strong> – indywidualny profil Użytkownika w Aplikacji.
        </p>
        <p className="text-gray-700 mt-2">
          2.4. <strong>Treści</strong> – materiały edukacyjne, fiszki, zestawy słownictwa i inne dane udostępniane w Aplikacji.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">3. Rejestracja i korzystanie z konta</h2>
        <p className="text-gray-700 mt-2">
          3.1. Aby korzystać z pełnej funkcjonalności Aplikacji, Użytkownik musi założyć Konto.
        </p>
        <p className="text-gray-700 mt-2">
          3.2. Rejestracja wymaga podania prawdziwych danych osobowych i adresu e-mail.
        </p>
        <p className="text-gray-700 mt-2">
          3.3. Użytkownik zobowiązuje się do zabezpieczenia swoich danych logowania i nieudostępniania ich osobom trzecim.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">4. Funkcjonalności Aplikacji</h2>
        <p className="text-gray-700 mt-2">4.1. Aplikacja umożliwia:</p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Tworzenie i edycję fiszek oraz zestawów edukacyjnych,</li>
          <li className="hidden">Korzystanie z gotowych zestawów udostępnionych przez Administratora,</li>
          <li>Korzystanie z systemu powtórek opartych na algorytmach SRS.</li>
          <li>Naukę z pomocą sztucznej inteligencji.</li>
          <li>Generowanie zmyślonych opowiadań, do ćwiczenia słownictwa oraz czytania.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          4.2. Administrator zastrzega sobie prawo do modyfikacji funkcjonalności Aplikacji.
        </p>

        {/* Additional Sections */}
        <h2 className="text-lg font-semibold text-gray-800 mt-6">5. Obowiązki Użytkownika</h2>
        <p className="text-gray-700 mt-2">
          5.1. Użytkownik zobowiązuje się korzystać z Aplikacji zgodnie z przepisami prawa oraz niniejszym Regulaminem.
        </p>
        <p className="text-gray-700 mt-2">5.2. Użytkownik nie może umieszczać w Aplikacji treści:</p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Naruszających prawa autorskie lub inne prawa własności intelektualnej,</li>
          <li>O treści niezgodnej z prawem, obraźliwej lub wulgarnej,</li>
          <li>Naruszających prywatność innych osób.</li>
        </ul>
        {/* Additional sections formatted similarly */}
        <h2 className="text-lg font-semibold text-gray-800 mt-6">6. Opłaty i subskrypcje</h2>
        <p className="text-gray-700 mt-2">6.1. Korzystanie z podstawowych funkcji Aplikacji jest bezpłatne.</p>
        <p className="text-gray-700 mt-2">6.2. Niektóre funkcjonalności mogą wymagać wykupienia subskrypcji premium.</p>
        <p className="text-gray-700 mt-2">6.3. Szczegółowe warunki subskrypcji premium (w tym cennik) są określone w odrębnej sekcji <a className="text-blue-600" href="http://localhost:3001/app/premium">Aplikacji</a>.</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">7. Prawa autorskie</h2>
        <p className="text-gray-700 mt-2">7.1. Aplikacja oraz wszystkie jej elementy (w tym logo, grafiki, kod źródłowy) są chronione prawem autorskim.</p>
        <p className="text-gray-700 mt-2">7.2. Użytkownik ma prawo korzystać z Treści wyłącznie na własny użytek.</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">8. Odpowiedzialność</h2>
        <p className="text-gray-700 mt-2">8.1. Administrator dokłada wszelkich starań, aby Aplikacja działała poprawnie, ale nie gwarantuje jej nieprzerwanej i bezbłędnej działalności.</p>
        <p className="text-gray-700 mt-2">8.2. Administrator nie ponosi odpowiedzialności za skutki korzystania z Aplikacji przez Użytkownika.</p>
        <p className="text-gray-700 mt-2">8.3. Administrator nie ponosi odpowiedzialności za utracone dane w aplikacji.</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">9. Rozwiązanie umowy i usunięcie konta</h2>
        <p className="text-gray-700 mt-2">9.1. Użytkownik może w każdym momencie usunąć swoje Konto za pośrednictwem ustawień Aplikacji.</p>
        <p className="text-gray-700 mt-2">9.2. Administrator zastrzega sobie prawo do zablokowania lub usunięcia Konta Użytkownika naruszającego Regulamin.</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">10. Postanowienia końcowe</h2>
        <p className="text-gray-700 mt-2">10.1. Administrator zastrzega sobie prawo do zmiany Regulaminu. Użytkownicy zostaną poinformowani o zmianach z co najmniej 14-dniowym wyprzedzeniem.</p>
        <p className="text-gray-700 mt-2">10.2. Wszelkie spory związane z korzystaniem z Aplikacji rozstrzygać będzie sąd właściwy dla siedziby Administratora.</p>
        <p className="text-gray-700 mt-2">10.3. W sprawach nieuregulowanych niniejszym Regulaminem mają zastosowanie przepisy powszechnie obowiązującego prawa.</p>

        <p className="text-gray-600 mt-6">---<br />Data ostatniej aktualizacji: 27.01.2025</p>
      </div>
      </div>
      {/* Stopka */}
      <Footer />
    </div>
  );
};

export default LandingPageRules;
