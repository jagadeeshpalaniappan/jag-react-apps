import React from "react";
import { connect } from "react-redux";
import { openUserModalAction } from "../state/userModal/actions";

const AddUser = ({ openUserModal }) => {
  return (
    <button
      type="button"
      class="btn btn-primary"
      onClick={() => openUserModal()}
    >
      Add User
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openUserModal: (payload) => dispatch(openUserModalAction(payload)),
  };
};
export default connect(null, mapDispatchToProps)(AddUser);
