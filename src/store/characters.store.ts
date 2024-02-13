import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Info } from '../generated/graphql';
import { FilterButtonsE } from '../types/common.types';

export const favoriteCharacters = atom<Array<string>>([]);

export const selectedCharacterStore = atom<string>('');

export const paginationStore = atomWithReset<Info['pages'] | null>(null);

export const genderFilterStore = atomWithReset<FilterButtonsE | null>(null);

export const searchNameStore = atomWithReset<string>('');
