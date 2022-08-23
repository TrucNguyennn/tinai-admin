const getItemLocalStorage = (items: string): string | undefined => {
  const item: string | null = JSON.parse(localStorage.getItem(items) as string);
  if (item) return item;
  return;
};
export default getItemLocalStorage;
