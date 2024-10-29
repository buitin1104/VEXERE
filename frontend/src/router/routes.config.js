import PrivateRoute from '@components/private-router/PrivateRoute';
import Layout from '@layout/Layout';
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
    layoutProps: { showSearch: false, showSearch: true },
  },
  {
    path: RouterPath.REGISTER_HOST,
    element: RegisterHostPage,
    layout: Layout,
    layoutProps: { showText: false },
  },
  {
    path: '/about',
    element: HomePage,
    layout: PrivateRoute,
  },
  {
    path: '*',
    element: NotFoundPage,
    layout: Layout,
  },
];

export default routesConfig;
