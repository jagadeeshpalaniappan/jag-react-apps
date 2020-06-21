import React from "react";
import { Button, Form, Input } from "reactstrap";

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

const UserFiltersModalForm = ({ register, onSubmit, onReset, onCancel }) => {
  console.log("### UserFiltersModalForm:");

  return (
    <Form onSubmit={onSubmit}>
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
          onClick={onReset}
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
