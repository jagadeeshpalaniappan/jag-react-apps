import React from "react";
import { connect } from "react-redux";
import { openUserModalAction } from "../state/userModal/actions";

const AddUser = ({ openUserModalAction }) => {
  return (
    <button
      type="button"
      className="btn btn-primary mr-1"
      onClick={() => openUserModalAction()}
    >
      Add User
    </button>
  );
};

const mapDispatchToProps = { openUserModalAction };
export default connect(null, mapDispatchToProps)(AddUser);
