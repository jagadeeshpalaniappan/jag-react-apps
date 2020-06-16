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
const UserFiltersModal = ({ filters, onOk, onCancel, ...rest }) => {
  // const [switchOn, setSwitchOn] = useState(false);
  console.log("UserFiltersModal:", { filters });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: filters,
  });
  const onSubmit = (data) => {
    console.log("FORM-VALUES:", { data });
    // onSave(data);
    onOk(data);
  };

  useEffect(() => {
    console.log("useEffect", { filters });
    reset(filters);
  }, [reset, filters]);

  return (
    <AppModal toggle={onCancel} {...rest}>
      <AppCard>
        <h5>User Filter</h5>
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
                  name="activeStatus"
                  bsSize="sm"
                  innerRef={register()}
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
