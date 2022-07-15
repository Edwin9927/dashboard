import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'reserva/list', element: <ReservaList/>},
        
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'mesa',
          children:[
            {element: <Navigate to="/dashboard/mesa/list" replace />, index: true},
            {path: 'list', element: <MesaList />},
            {path: 'new', element: <MesaCreate />},
            {path: ':name/edit', element: <MesaCreate />}
          ],
        },
        {
          path: 'menu',
          children:[
            {element: <Navigate to="/dashboard/menu/list" replace />, index: true},
            {path: 'list', element: <MenuList />},
            {path: 'new', element: <MenuCreate />}
          ],
        },
        {
          path: 'alimento',
          children:[
            {element: <Navigate to="/dashboard/alimento/list" replace />, index: true},
            {path: 'list', element: <AlimentoList />},
            {path: 'new', element: <AlimentoCreate />},
            {path: ':name/edit', element: <AlimentoCreate />}
          ],
        },
        {
          path: 'pedido',
          children:[
            {element: <Navigate to="/dashboard/pedido/list" replace />, index: true},
            {path: 'list', element: <PedidoList />},
            {path: 'new', element: <PedidoCreate />}
          ],
        },
        {
          path: 'venta',
          children:[
            {element: <Navigate to="/dashboard/venta/list" replace />, index: true},
            {path: 'list', element: <VentaList />},
            {path: 'new', element: <VentaCreate />}
          ],
        }
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const AlimentoCreate = Loadable(lazy(() => import('../pages/dashboard/AlimentoCreate')));
const AlimentoList = Loadable(lazy(() => import('../pages/dashboard/AlimentoList')));
const MesaCreate = Loadable(lazy(() => import('../pages/dashboard/MesaCreate')));
const MesaList = Loadable(lazy(() => import('../pages/dashboard/MesaList')));
const MenuCreate = Loadable(lazy(() => import('../pages/dashboard/MenuCreate')));
const MenuList = Loadable(lazy(() => import('../pages/dashboard/MenuList')));
const PedidoCreate = Loadable(lazy(() => import('../pages/dashboard/PedidoCreate')));
const PedidoList = Loadable(lazy(() => import('../pages/dashboard/PedidoList')));
const ReservaList = Loadable(lazy(() => import('../pages/dashboard/ReservaList')));
const VentaList = Loadable(lazy(() => import('../pages/dashboard/VentaList')));
const VentaCreate = Loadable(lazy(() => import('../pages/dashboard/VentaCreate')));

// Main
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
