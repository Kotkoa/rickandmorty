const randomInt = (): number => {
  const min = 1;
  const max = 671;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateUniqueRandomIds = (count: number): string[] => {
  const uniqueIds = new Set<string>();
  while (uniqueIds.size < count) {
    uniqueIds.add(randomInt().toString());
  }
  return [...uniqueIds];
};
