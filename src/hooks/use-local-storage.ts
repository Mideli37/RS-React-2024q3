import { useEffect, useState } from 'react';

export function useLocalStorage({ key }: { key: string }): [string, (value: string) => void] {
  const [value, setValue] = useState('');

  useEffect(() => {
    const lsValue = localStorage.getItem(key);
    if (lsValue) {
      setValue(lsValue);
    }
  }, [key]);

  return [
    value,
    (newValue: string): void => {
      setValue(newValue);
      localStorage.setItem(key, newValue);
    },
  ];
}
