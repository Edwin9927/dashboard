// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  user: getIcon('ic_user'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Estadisticas', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Reservas', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Adminsitración',
    items: [
      // MANAGEMENT : USER
      {
        title: 'Usuarios',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.newUser },
          { title: 'edit', path: PATH_DASHBOARD.user.editById },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // ALIMENTOS
      {
        title: 'Alimentos',
        path: PATH_DASHBOARD.alimento.root,
        icon: ICONS.user,
        children: [
          { title: 'lista', path: PATH_DASHBOARD.alimento.list },
          { title: 'crear', path: PATH_DASHBOARD.alimento.newAlimento },
        ],
      },
      {
        title: 'mesa',
        path: PATH_DASHBOARD.mesa.root,
        icon: ICONS.user,
        children: [
          { title: 'lista', path: PATH_DASHBOARD.mesa.list },
          { title: 'crear', path: PATH_DASHBOARD.mesa.newMesa },
        ],
      },

      // Pididos
      {
        title: 'Pedidos',
        path: PATH_DASHBOARD.pedido.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.pedido.list },
          { title: 'create', path: PATH_DASHBOARD.pedido.newPedido },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'Calificaciones',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
    ],
  },
];

export default navConfig;
