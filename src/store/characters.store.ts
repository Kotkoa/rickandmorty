import { atom } from 'jotai';

export const favoriteCharacters = atom<Array<string>>([]);

export const selectedCharacterStore = atom<string>('');
