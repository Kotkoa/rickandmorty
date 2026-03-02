import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { FilterButtonsE } from '../types/common.types';

export const favoriteCharacters = atom<Array<string>>([]);

export const selectedCharacterStore = atom<string>('');

export const paginationStore = atomWithReset<number | null>(null);

export const genderFilterStore = atomWithReset<FilterButtonsE | null>(null);

export const searchNameStore = atomWithReset<string>('');
