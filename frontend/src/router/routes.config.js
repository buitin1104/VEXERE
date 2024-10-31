import PrivateRoute from '@components/private-router/PrivateRoute';
import Layout from '@layout/Layout';
import AdminPage from '@pages/admin';
import ConfirmPage from '@pages/confirm/ConfirmPage';
import CreatedSuccessPage from '@pages/created-success/CreatedSuccessPage';
import DetailPage from '@pages/detail/DetailPage';
import HomePage from '@pages/homepage/HomePage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import RegisterHostPage from '@pages/register-host/RegisterHostPage';
import SearchPage from '@pages/search/SearchPage';
import { RouterPath } from './RouterPath';

const routesConfig = [
  {
    path: '/',
    element: HomePage,
    layout: Layout,
    layoutProps: { showText: true, showSearch: true },
  },
  {
    path: RouterPath.DETAIL,
    element: DetailPage,
    layout: Layout,
  },
  {
    path: RouterPath.SEARCH,
    element: SearchPage,
    layout: Layout,
    layoutProps: { showSearch: false, showSearch: false },
  },
  {
    path: RouterPath.REGISTER_HOST,
    element: RegisterHostPage,
    layout: Layout,
    layoutProps: { showText: false },
  },
  {
    path: RouterPath.CONFIRM_INFORMATION,
    element: ConfirmPage,
    layout: Layout,
    layoutProps: { showText: false },
  },
  {
    path: RouterPath.CREATED_SUCCESS,
    element: CreatedSuccessPage,
    layout: Layout,
    layoutProps: { showText: false },
  },
  {
    path: RouterPath.ADMIN,
    element: AdminPage,
  },
  {
    path: '/about',
    element: HomePage,
    layout: PrivateRoute,
  },
  {
    path: RouterPath.NOT_FOUND,
    element: NotFoundPage,
    layout: Layout,
  },
];

export default routesConfig;
