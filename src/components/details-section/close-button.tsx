import type { JSX } from 'react';

export function CloseButton({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button
      type="button"
      className="button absolute top-10 right-10 w-10"
      onClick={onClick}
    >
      ×
    </button>
  );
}
