import { useState, type JSX } from 'react';

export function ErrorButton(): JSX.Element {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('The button throw an error');
  }

  return (
    <button
      className="fixed left-3 bottom-3 button"
      type="button"
      onClick={() => {
        setHasError(true);
      }}
    >
      Error button
    </button>
  );
}
