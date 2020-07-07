const filterFn = (item, searchKey) => {
  return Object.values(item).some(
    (item) =>
      item &&
      typeof item === "string" &&
      item.toLowerCase().startsWith(searchKey)
  );
};

export const filterItemsByVal = (items, keyword) => {
  if (!(keyword && keyword.length > 0 && items && items.length > 0)) {
    return items;
  }

  const searchKey = keyword && keyword.toLowerCase();
  const searchResults = items.filter((item) => filterFn(item, searchKey));
  return searchResults;
};
