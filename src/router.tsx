import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/error-page';
import { MainPage } from './pages/main-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
]);
