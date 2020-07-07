import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input } from "reactstrap";
import { arrToMap, deepEqual, mapToArr } from "../../common/utils/all.utils";
import UsersDropdown from "./UsersDropdown";

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

const PostFiltersModalForm = ({ filters, filterUsers, onOk, onCancel }) => {
  console.log("### PostFiltersModalForm:", { filters });

  const { register, handleSubmit, reset } = useForm({ defaultValues: {} });

  const [selectedUsers, setSelectedUsers] = useState(null);

  const onSubmit = useCallback(
    (data) => {
      console.log("FORM-VALUES:", { data });
      const newFilterArr = mapToArr(data, ["all", ""]) || [];

      if (selectedUsers)
        newFilterArr.push({ key: "users", value: selectedUsers });

      if (!deepEqual(filters, newFilterArr)) {
        console.log("newFilters::found", { filters, newFilterArr });
        onOk(newFilterArr);
      } else {
        onCancel();
      }
    },
    [filters, selectedUsers, onOk, onCancel]
  );

  const handleReset = useCallback(() => {
    reset({});
    setSelectedUsers(null);
  }, [reset]);

  // onFiltersChange:
  useEffect(() => {
    console.log("reset, filters --changed", { filters });
    const filtersMap = arrToMap(filters || []);
    const { users, ...restFilters } = filtersMap;
    setSelectedUsers(users);
    reset(restFilters);
  }, [reset, filters]);

  const handleUsersSelection = useCallback(
    (newSelectedUsers) => {
      console.log("handleUsersSelection:", { newSelectedUsers });
      setSelectedUsers(newSelectedUsers);
    },
    [setSelectedUsers]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p>{JSON.stringify(filterUsers)}</p>
      <div>
        {/* 
        <div className="d-flex align-items-center my-3">
          <div className="flex-grow-1">UserId:</div>
          <div className="">
            <Input
              type="text"
              name="userId"
              bsSize="sm"
              innerRef={register()}
              style={{ width: "10rem" }}
            ></Input>
          </div>
        </div>
         */}
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
              <option value="active">Active Posts</option>
              <option value="inactive">InActive Posts</option>
            </Input>
          </div>
        </div>
        <div className="my-3">
          <div className="mb-1">User:</div>
          <div>
            <UsersDropdown
              isMulti
              selectedUsers={selectedUsers}
              onChange={handleUsersSelection}
            />
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

export default React.memo(PostFiltersModalForm);
