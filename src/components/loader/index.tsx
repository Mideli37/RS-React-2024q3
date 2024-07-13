import type { JSX } from 'react';

export function Loader(): JSX.Element {
  return (
    <div className="grow flex justify-center items-center w-full bg-teal-50">
      <div className="loader" />
    </div>
  );
}
