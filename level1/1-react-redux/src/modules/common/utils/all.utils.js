import isEqualCompare from "fast-deep-equal";
import isEqualCompareReact from "fast-deep-equal/es6/react";
// import isEqual from "react-fast-compare";

export const isEqual = isEqualCompare;
export const isEqualReact = isEqualCompareReact;

export const arrToMap = (items = []) =>
  items.reduce((res, item) => {
    res[item.key] = item.value;
    return res;
  }, {});
