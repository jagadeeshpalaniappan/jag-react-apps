import PropTypes from "prop-types";
import React, { useEffect } from "react";
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

const UserFiltersModal = ({ filters, isOpen, onOk, onCancel }) => {
  console.log("### UserFiltersModal:", { filters });

  return (
    <AppModal toggle={onCancel} isOpen={isOpen}>
      <AppCard>
        <legend>User Filter</legend>
        <UserFiltersModalForm
          filters={filters}
          onOk={onOk}
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
