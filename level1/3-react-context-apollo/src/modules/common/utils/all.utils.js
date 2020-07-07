import isEqualCompare from "fast-deep-equal";
import isEqualCompareReact from "fast-deep-equal/es6/react";
// import deepEqual from "react-fast-compare";

export const deepEqual = isEqualCompare;
export const deepEqualReact = isEqualCompareReact;

export const arrToMap = (items = []) =>
  items.reduce((res, item) => {
    res[item.key] = item.value;
    return res;
  }, {});

export const mapToArr = (map, skipValuesArr) => {
  const skipValues = new Set(skipValuesArr);
  let items = [];
  if (map) {
    const keys = Object.keys(map);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      const value = map[key];
      if (!(skipValues && skipValues.has(value))) {
        items.push({ key, value });
      }
    }
  }
  return items && items.length > 0 ? items : null;
};
