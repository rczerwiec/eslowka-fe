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
      'W intuycyjny sposób przemieszczaj się po aplikacji przy pomocy przyjaznego dla oka interfejsu.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Sprytne ćwiczenia',
    description:
      'Gdy powtarzasz swoje słówka, w tle dzieje się prawdziwa magia. Aplikacja stale monitoruje jak sobie radzisz z danymi słowami i pomaga Ci dobrać odpowiedni pakiet do ćwiczeń.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Wieloplatformowość',
    description:
      'Korzystaj z swoich słówek na stronie i swoim urządzeniu mobilnym. Ucz się w pociągu, w poczekalni czy w jakimkolwiek innym miejscu.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Gotowe zbiory',
    description:
      'Korzystaj z gotowych zbiorów słówek, utworzonych przez nas oraz przez społeczność esłówka. Dziel się swoimi zbiorami ze znajomymi czy nawet kursantami',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Własne historyjki!',
    description:
      'Wymyśl dowolny tytuł i pozwól by sztuczna inteligencja stworzyła na jego podstawe całą opowieść. Od Ciebie zależy w jakim języku i na jakim poziomie ma ona być.',
  },
  {
    icon: <AiFillAmazonCircle />,
    text: 'Pomocny ChatAI',
    description:
      'Nie masz weny twórcze? Nie chcesz przeszukiwać całego internetu w poszukiwaniu nowych zbiorów? Nie ma problemu! Poproś o to AI!',
  },
];

export const checklistItems = [
  {
    title: 'Utwórz zbiór słówek',
    description:
      'Wybierz gotowy, stwórz własny lub wspomóż się narzędzmi żeby utworzyć zbiór słówek, których chcesz się uczyć.',
  },
  {
    title: 'Powtarzaj słówka',
    description:
      'Powtarzaj słowka za pomocą dostępnych ćwiczeń, proś Chat AI by generował Ci zdania z tymi słówkami i proś by poprawiał Ci błędy.',
  },
  {
    title: 'Twórz historyjki',
    description:
      'Historyjki pozwalają Ci ćwiczyć czytanie. Wymyśl tytuł i wygeneruj coś. Od Ciebie zależy jaki to ma być poziom A1? B2, a może C2? W każdym momencie możesz dodać nieznane słówko do swojego zbioru!',
  },
  {
    title: 'Śledź swój progress',
    description:
      'Wbijaj poziomy i obserwuj jak Twój progress rośnie dla danego zbioru!',
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
    title: 'Pro',
    price: '19 PLN',
    features: [
      'Dostępne wszystkie funkcje aplikacji',
      '999 słówek na zbiór',
      '99 zapytań do Chatu AI dziennie',
      '99 historyjek dziennie',
    ],
  },
  {
    title: 'Pro Roczne',
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
  { href: '#', text: 'Facebiij' },
  { href: '#', text: 'Youtube' },
  { href: '#', text: 'Tiktok' },
  { href: '#', text: 'Discord' },
];
