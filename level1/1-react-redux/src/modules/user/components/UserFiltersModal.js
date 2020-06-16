import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppModal, AppCard } from "../../common/components";
import { Button, Form, ButtonGroup } from "reactstrap";

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

const UserFiltersModal = ({ item, onOk, onCancel, ...rest }) => {
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <AppModal toggle={onCancel} {...rest}>
      <AppCard>
        <h5>User Filter</h5>
        <div>
          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1">Filter1</div>
            <div className="">
              <select className="custom-select custom-select-sm">
                <option value="0">Default</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
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
          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1">Filter3</div>
            <div className="">
              <ButtonGroup size="sm">
                <Button>Left</Button>
                <Button active>Right</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onOk(e, item);
          }}
        >
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              color="secondary"
              className="mr-2"
              onClick={onCancel}
            >
              Cancel
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
