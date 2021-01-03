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

const UserModal = ({ isOpen, user, createUser, updateUser, onClose }) => {
  const handleSave = (formUser) => {
    if (formUser.id) updateUser(formUser);
    else createUser(formUser);
  };

  const toggle = (...args) => {
    console.log("toggle", args);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} backdrop keyboard>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
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

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (payload) => dispatch(apiCreateUserAction(payload)),
    updateUser: (payload) => dispatch(apiUpdateUserAction(payload)),
    onClose: (payload) => dispatch(closeUserModalAndResetStatusAction(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserModal));
