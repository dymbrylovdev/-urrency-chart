import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/main';
import { NotFoundPage } from 'pages/not-found';

export enum AppRouters {
  MAIN = 'main',
  NOT_FOUND = 'not_found',
}

export const RouterPath: Record<AppRouters, string> = {
  [AppRouters.MAIN]: '/',
  [AppRouters.NOT_FOUND]: '/*',
};

export const RouterConfig: Record<AppRouters, RouteProps> = {
  [AppRouters.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },

  [AppRouters.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
