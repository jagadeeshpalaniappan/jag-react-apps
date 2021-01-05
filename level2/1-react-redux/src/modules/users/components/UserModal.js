/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import UserForm from "../components/UserForm";
import { UserMutaionStatus } from "./UserStatus";
import { apiCreateUserAction } from "../state/createUser/actions";
import { apiUpdateUserAction } from "../state/updateUser/actions";
import { closeUserModalAndResetStatusAction } from "../state/userModal/actions";

const UserModal = ({
  isOpen,
  user,
  apiCreateUserAction,
  apiUpdateUserAction,
  onClose,
}) => {
  const handleSave = (formUser) => {
    if (formUser.id) apiUpdateUserAction(formUser);
    else apiCreateUserAction(formUser);
  };

  const toggle = (...args) => {
    console.log("toggle", args);
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        backdrop
        keyboard
        contentClassName="bg-light"
      >
        <ModalHeader className="border-0">
          {user && user.id ? "Update User" : "Create User"}
        </ModalHeader>
        <ModalBody className="px-5">
          <UserMutaionStatus />
          <UserForm user={user} onSave={handleSave} onCancel={onClose} />
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.userState.userModal.isOpen,
  user: state.userState.userModal.user,
});

const mapDispatchToProps = {
  apiCreateUserAction,
  apiUpdateUserAction,
  onClose: closeUserModalAndResetStatusAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserModal));
