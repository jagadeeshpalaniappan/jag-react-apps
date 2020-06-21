import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input } from "reactstrap";
import { arrToMap, isEqual, mapToArr } from "../../common/utils/all.utils";

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

const UserFiltersModalForm = ({ filters, onOk, onCancel }) => {
  console.log("### UserFiltersModalForm:", { filters });

  const { register, handleSubmit, reset } = useForm({ defaultValues: {} });

  const onSubmit = useCallback(
    (data) => {
      console.log("FORM-VALUES:", { data });
      const newFilterArr = mapToArr(data, new Set(["all"]));

      if (!isEqual(filters, newFilterArr)) {
        console.log("newFilters::found", { filters, newFilterArr });
        onOk(newFilterArr);
      } else {
        onCancel();
      }
    },
    [filters, onOk, onCancel]
  );

  const handleReset = useCallback(() => reset({}), [reset]);
  useEffect(() => {
    console.log("reset, filters --changed", { filters });
    const filtersMap = arrToMap(filters || []);
    reset(filtersMap);
  }, [reset, filters]);

  return (
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
          onClick={handleReset}
        >
          Reset All
        </Button>
        <Button type="submit" color="primary">
          Apply Filter
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(UserFiltersModalForm);
