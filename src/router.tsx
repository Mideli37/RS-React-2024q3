import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/error-page';
import { MainPage } from './pages/main-page';
import { DetailsSection } from './components/details-section';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [{ path: 'details/:id', element: <DetailsSection /> }],
  },
]);
