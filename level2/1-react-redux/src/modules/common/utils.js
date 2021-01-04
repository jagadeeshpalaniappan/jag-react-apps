export const searchObjVals = (item, searchKey) => {
  return Object.values(item).some((item) => {
    let searchMacthed = false;
    if (item && typeof item === "string") {
      const searchText = searchKey.toLowerCase();
      const strArr = item.toLowerCase().split(" ");
      searchMacthed = strArr.some((str) => str.startsWith(searchText));
    }
    return searchMacthed;
  });
};
