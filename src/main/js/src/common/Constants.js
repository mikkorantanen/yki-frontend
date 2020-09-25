export const DATE_FORMAT = 'D.M.YYYY';
export const DATE_FORMAT_WITHOUT_YEAR = 'D.M.';
export const ISO_DATE_FORMAT_SHORT = 'YYYY-MM-DD';
export const LANGUAGES = [
  {
    code: 'fin',
    name: 'Suomi',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'swe',
    name: 'Ruotsi',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'eng',
    name: 'Englanti',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'deu',
    name: 'Saksa',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'rus',
    name: 'Venäjä',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'fra',
    name: 'Ranska',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'sme',
    name: 'Pohjoissaame',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'spa',
    name: 'Espanja',
    levels: ['PERUS', 'KESKI', 'YLIN'],
  },
  {
    code: 'ita',
    name: 'Italia',
    levels: ['PERUS', 'KESKI'],
  },
];
export const MOBILE_VIEW = window.innerWidth < 426;
export const MOBILE_VIEW_LARGE_LANDSCAPE =
    window.innerWidth > 426 && window.innerWidth < 1023 && window.screen.orientation.type === 'landscape-primary';
export const TABLET_VIEW = window.innerWidth < 770;
export const SCREEN_ORIENTATION = window.screen.orientation;
