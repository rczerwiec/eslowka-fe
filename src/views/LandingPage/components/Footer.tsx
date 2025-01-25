import { resourcesLinks, platformLinks, communityLinks } from "../../../constants";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="mt-20 bg-gradient-to-r rounded-t-lg from-neutral-900 via-gray-800 to-neutral-900 py-10 text-neutral-300 font-inter"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sekcja Zbiory */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Zbiory</h3>
            <ul className="space-y-4">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:scale-105 transition-transform duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sekcja Aplikacja */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Aplikacja</h3>
            <ul className="space-y-4">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:scale-105 transition-transform duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sekcja Społeczność */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Społeczność</h3>
            <ul className="space-y-4">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:scale-105 transition-transform duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Stopka */}
        <div className="mt-12 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Esłówka.pl - Wszystkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
