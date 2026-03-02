const TOTAL_CHARACTERS = 671;

const randomInt = (): number => {
  return Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
};

export const generateUniqueRandomIds = (count: number): string[] => {
  const uniqueIds = new Set<string>();
  while (uniqueIds.size < count) {
    uniqueIds.add(randomInt().toString());
  }
  return [...uniqueIds];
};
