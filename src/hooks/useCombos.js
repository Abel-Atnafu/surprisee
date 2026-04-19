import { useCollection } from './useCollection';
import { COMBOS } from '../lib/collections';

export function useCombos() {
  return useCollection(COMBOS);
}
