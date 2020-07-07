import PropTypes from "prop-types";
import React from "react";
import { AppCard, AppModal } from "../../common/components";
import UserFiltersModalForm from "./UserFiltersModalForm";

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
