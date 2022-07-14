// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    reserva: path(ROOTS_DASHBOARD, '/reserva/list')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  alimento:{
    root: path(ROOTS_DASHBOARD, '/alimento'),
    list: path(ROOTS_DASHBOARD, '/alimento/list'),
    newAlimento: path(ROOTS_DASHBOARD, '/alimento/new'),
    editAlimentoById: path(ROOTS_DASHBOARD, '/alimento/nombre/edit')
  },
  mesa:{
    root: path(ROOTS_DASHBOARD, '/mesa'),
    list: path(ROOTS_DASHBOARD, '/mesa/list'),
    newMesa: path(ROOTS_DASHBOARD, '/mesa/new'),
  },
  menu:{
    root: path(ROOTS_DASHBOARD, '/menu'),
    list: path(ROOTS_DASHBOARD, '/menu/list'),
    newMenu: path(ROOTS_DASHBOARD, '/menu/new'),
  },
  pedido:{
    root: path(ROOTS_DASHBOARD, '/pedido'),
    list: path(ROOTS_DASHBOARD, '/pedido/list'),
    newPedido: path(ROOTS_DASHBOARD, '/pedido/new'),
  },
  reserva:{
    root: path(ROOTS_DASHBOARD, '/reserva/list'),
    list: path(ROOTS_DASHBOARD, '/reserva/list'),
  },

};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
