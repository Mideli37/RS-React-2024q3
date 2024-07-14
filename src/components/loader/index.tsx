import type { JSX } from 'react';

export function Loader(): JSX.Element {
  return (
    <div
      data-testid="loader"
      className="grow flex justify-center items-center w-full bg-teal-50"
    >
      <div className="loader" />
    </div>
  );
}
