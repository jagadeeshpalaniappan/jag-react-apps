import React from "react";
import { connect } from "react-redux";
import { openUserModalAction } from "../../state/userModal/actions";

const AddButton = ({ openUserModalAction }) => {
  return (
    <button
      type="button"
      className="btn btn-primary text-nowrap mr-1"
      onClick={() => openUserModalAction()}
    >
      Add User
    </button>
  );
};

const mapDispatchToProps = { openUserModalAction };
export default connect(null, mapDispatchToProps)(AddButton);
