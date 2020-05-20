import { useRef } from 'react';
import { generateId } from '../utils';

export const useUniqueId = () => {
  const id = useRef(String(generateId()));
  return id.current;
};
