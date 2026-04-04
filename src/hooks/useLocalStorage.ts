'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Validate type consistency: if initialValue is an array, parsed must also be an array (and vice versa)
        if (Array.isArray(initialValue) !== Array.isArray(parsed)) {
          console.warn(`useLocalStorage: type mismatch for key "${key}", using initial value`);
        } else {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoaded(true);
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, isLoaded];
}
