import { useCollection } from './useCollection';
import { MENU } from '../lib/collections';

export function useMenu() {
  return useCollection(MENU);
}
