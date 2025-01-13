import { AiFillAmazonCircle } from "react-icons/ai";

import user1 from './user1.jpg';
import user2 from './user1.jpg';
import user3 from './user1.jpg';
import user4 from './user1.jpg';
import user5 from './user1.jpg';
import user6 from './user1.jpg';

export const navItems = [
  { label: 'Funkcje', href: '#features' },
  { label: 'Jak korzystać?', href: '#workflow' },
  { label: 'Cennik', href: '#pricing' },
  { label: 'Opinie', href: '#testimonials' },
];

export const testimonials = [
  {
    user: 'John Doe',
    company: 'Stellar Solutions',
    image: user1,
    text: 'I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.',
  },
  {
    user: 'Jane Smith',
    company: 'Blue Horizon Technologies',
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: 'David Johnson',
    company: 'Quantum Innovations',
    image: user3,
    text: 'Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.',
  },
  {
    user: 'Ronee Brown',
    company: 'Fusion Dynamics',
    image: user4,
    text: 'Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!',
  },
  {
    user: 'Michael Wilson',
    company: 'Visionary Creations',
    image: user5,
    text: 'I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.',
  },
  {
    user: 'Emily Davis',
    company: 'Synergy Systems',
    image: user6,
    text: 'The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.',
  },
];

export const features = [
  {
    icon: <AiFillAmazonCircle/>,
    text: 'Prosty w obsłudze interfejs',
    description:
      'Intuicyjnie poruszaj się po aplikacji dzięki przejrzystemu i estetycznemu interfejsowi.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Sprytne ćwiczenia',
    description:
      'Podczas powtarzania słówek w tle działa prawdziwa magia. Aplikacja nieustannie analizuje Twoje postępy i dobiera idealny zestaw ćwiczeń, aby nauka była jeszcze bardziej efektywna.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Wieloplatformowość',
    description:
      'Ucz się swoich słówek zarówno na stronie internetowej, jak i na urządzeniu mobilnym. Ćwicz w pociągu, w poczekalni lub gdziekolwiek jesteś.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Gotowe zbiory',
    description:
      'Wykorzystuj gotowe zestawy słówek stworzone przez nas i społeczność eSłówka. Udostępniaj własne zbiory znajomym, a nawet swoim kursantom.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Własne historyjki!',
    description:
      'Wprowadź dowolny tytuł, a sztuczna inteligencja stworzy na jego podstawie całą opowieść. To Ty decydujesz, w jakim języku i na jakim poziomie trudności ma powstać historia.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Pomocny ChatAI',
    description:
      'Brakuje Ci inspiracji? Nie masz ochoty przeszukiwać internetu w poszukiwaniu nowych zestawów? Żaden problem! Zleć to AI!',
  },
];

export const checklistItems = [
  {
    title: 'Utwórz zbiór słówek',
    description:
      'Wybierz gotowy zestaw, stwórz własny lub skorzystaj z dostępnych narzędzi, aby utworzyć zbiór słówek, których chcesz się uczyć.',
  },
  {
    title: 'Powtarzaj słówka',
    description:
      'Powtarzaj słówka za pomocą dostępnych ćwiczeń, poproś Chat AI o tworzenie zdań z użyciem tych słówek i korektę Twoich błędów.',
  },
  {
    title: 'Twórz historyjki',
    description:
      'Historyjki pomagają ćwiczyć czytanie. Wymyśl tytuł i wygeneruj opowieść na wybranym poziomie — A1, B2, a może C2? W każdej chwili możesz dodać nieznane słówko do swojego zbioru!',
  },
  {
    title: 'Śledź swój progress',
    description:
      'Zdobywaj kolejne poziomy i śledź swój postęp w nauce dla wybranego zbioru!',
  },
];

export const pricingOptions = [
  {
    title: 'Za darmo!',
    price: '0 PLN',
    features: [
      'Wszystkie funkcje w wersji beta',
      '199 słówek na zbiór',
      '10 zapytań do Chatu AI dziennie',
      '10 historyjek dziennie',
    ],
  },
  {
    title: 'Premium',
    price: '19 PLN',
    features: [
      'Dostępne wszystkie funkcje aplikacji',
      '999 słówek na zbiór',
      '99 zapytań do Chatu AI dziennie',
      '99 historyjek dziennie',
    ],
  },
  {
    title: 'Premium Roczne',
    price: '199 PLN',
    features: [
      'Dostępne wszystkie funkcje aplikacji',
      '999 słówek na zbiór',
      '99 zapytań do Chatu AI dziennie',
      '99 historyjek dziennie',
    ],
  },
];

export const resourcesLinks = [
  { href: '#', text: 'Jak zacząć?' },
  { href: '#', text: 'Dokumentacja' },
  { href: '#', text: 'Poradniki' },
  { href: '#', text: 'API' },
];

export const platformLinks = [
  { href: '#', text: 'Logowanie' },
  { href: '#', text: 'Rejestracja' },

];

export const communityLinks = [
  { href: '#', text: 'Facebook' },
  { href: '#', text: 'Youtube' },
  { href: '#', text: 'Tiktok' },
  { href: '#', text: 'Discord' },
];
