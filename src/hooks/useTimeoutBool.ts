import { useState, useEffect } from 'react';

export const useTimeoutBool = (delay = 1000) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const enable = () => setIsEnabled(true);

  const disable = () => setIsEnabled(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isEnabled) {
      timeout = setTimeout(disable, delay);
    }

    return () => clearTimeout(timeout);
  }, [isEnabled]);

  return { status: isEnabled, enable, disable };
};
