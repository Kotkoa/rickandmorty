export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timeoutId);

  return debounced;
}
