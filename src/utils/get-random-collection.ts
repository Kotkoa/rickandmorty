export const generateUniqueRandomIds = (count: number, max: number): string[] => {
  const uniqueIds = new Set<string>();
  while (uniqueIds.size < count) {
    const id = Math.floor(Math.random() * max) + 1;
    uniqueIds.add(id.toString());
  }
  return [...uniqueIds];
};
