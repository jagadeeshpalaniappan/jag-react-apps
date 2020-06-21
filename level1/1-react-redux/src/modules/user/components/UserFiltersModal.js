import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppCard, AppModal } from "../../common/components";
import UserFiltersModalForm from "./UserFiltersModalForm";

/* 
const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitches"
        checked={checked}
        onChange={onChange}
        readOnly
      />
      <label className="custom-control-label" htmlFor="customSwitches"></label>
    </div>
  );
};
 */

const mapToArr = (map, skipValues) => {
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

const arrToMap = (arr, skipValues) => {
  let itemsMap = [];
  if (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      const { key, value } = arr[i];
      if (!(skipValues && skipValues.has(value))) {
        itemsMap[key] = value;
      }
    }
  }
  return itemsMap && Object.keys(itemsMap).length > 0 ? itemsMap : null;
};

const UserFiltersModal = ({ filters, onOk, onCancel, ...rest }) => {
  console.log("### UserFiltersModal:");
  const { register, handleSubmit, reset } = useForm({ defaultValues: {} });

  const onSubmit = useCallback(
    (data) => {
      console.log("FORM-VALUES:", { data });
      const filtersArr = mapToArr(data, new Set(["all"]));
      onOk(filtersArr);
    },
    [onOk]
  );

  const handleReset = useCallback(() => reset({}), [reset]);
  useEffect(() => {
    console.log("useEffect", { filters });
    const filtersMap = arrToMap(filters);
    reset(filtersMap);
  }, [reset, filters]);

  return (
    <AppModal toggle={onCancel} {...rest}>
      <AppCard>
        <legend>User Filter</legend>
        <UserFiltersModalForm
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleReset}
          onCancel={onCancel}
        />
      </AppCard>
    </AppModal>
  );
};

UserFiltersModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default React.memo(UserFiltersModal);
