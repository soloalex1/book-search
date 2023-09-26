import { useEffect, useState } from "react";

const useDebounce = (value: string, timeout: number = 250) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, timeout);

    return () => clearTimeout(handler);
  }, [timeout, value]);

  return debounceValue;
};

export default useDebounce;
