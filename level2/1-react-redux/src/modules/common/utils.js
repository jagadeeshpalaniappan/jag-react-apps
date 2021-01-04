export const searchObjVals = (item, searchKey) => {
  return Object.values(item).some(
    (item) =>
      item &&
      typeof item === "string" &&
      item.toLowerCase().startsWith(searchKey.toLowerCase())
  );
};
