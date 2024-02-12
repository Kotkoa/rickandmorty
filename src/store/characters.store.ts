import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Info } from '../generated/graphql';

export const favoriteCharacters = atom<Array<string>>([]);

export const selectedCharacterStore = atom<string>('');

export const paginationStore = atomWithReset<Info['pages'] | null>(null);
