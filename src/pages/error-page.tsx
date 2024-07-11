import type { JSX } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorPage(): JSX.Element {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteErrorResponse(error) ? (
        <p>
          <i>
            {error.statusText},{error.data},{error.status}
          </i>
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
