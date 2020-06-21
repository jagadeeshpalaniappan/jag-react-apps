import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input } from "reactstrap";

import { AppCard, AppModal } from "../../common/components";

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
  // const [switchOn, setSwitchOn] = useState(false);
  console.log("UserFiltersModal:", { filters });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  const onSubmit = (data) => {
    console.log("FORM-VALUES:", { data });
    const filtersArr = mapToArr(data, new Set(["all"]));
    onOk(filtersArr);
  };

  useEffect(() => {
    console.log("useEffect", { filters });
    const filtersMap = arrToMap(filters);
    reset(filtersMap);
  }, [reset, filters]);

  return (
    <AppModal toggle={onCancel} {...rest}>
      <AppCard>
        <legend>User Filter</legend>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1">Role:</div>
              <div className="">
                <Input
                  type="select"
                  name="role"
                  bsSize="sm"
                  innerRef={register()}
                  style={{ width: "10rem" }}
                >
                  <option value="all">All</option>
                  <option value="admin">Admin</option>
                  <option value="dev">Devloper</option>
                  <option value="manager">Manager</option>
                </Input>
              </div>
            </div>
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1">Active Status:</div>
              <div className="">
                <Input
                  type="select"
                  name="isActive"
                  bsSize="sm"
                  innerRef={register()}
                  style={{ width: "10rem" }}
                >
                  <option value="all" defaultChecked>
                    All
                  </option>
                  <option value="active">Active Users</option>
                  <option value="inactive">InActive Users</option>
                </Input>
              </div>
            </div>
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1">Gender:</div>
              <div className="">
                <Input
                  type="select"
                  name="sex"
                  bsSize="sm"
                  innerRef={register()}
                  style={{ width: "10rem" }}
                >
                  <option value="all" defaultChecked>
                    All
                  </option>
                  <option value="male">Male Users</option>
                  <option value="female">Female Users</option>
                </Input>
              </div>
            </div>
            {/* 
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1">Filter2</div>
              <div className="">
                <ToggleSwitch
                  checked={switchOn}
                  onChange={() => {
                    setSwitchOn(!switchOn);
                    console.log({ switchOn });
                  }}
                />
              </div>
            </div>
             */}
            {/* 
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1">Filter3</div>
              <div className="">
                <ButtonGroup size="sm">
                  <Button>Left</Button>
                  <Button active>Right</Button>
                </ButtonGroup>
              </div>
            </div>
             */}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              color="secondary"
              className="mr-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              color="secondary"
              className="mr-2"
              onClick={() => reset({})}
            >
              Reset All
            </Button>
            <Button type="submit" color="primary">
              Apply Filter
            </Button>
          </div>
        </Form>
      </AppCard>
    </AppModal>
  );
};

UserFiltersModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserFiltersModal;
