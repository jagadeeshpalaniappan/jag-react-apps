import React from "react";
import { connect } from "react-redux";
import { openPostModalAction } from "../../state/postModal/actions";

const AddButton = ({ openPostModalAction }) => {
  return (
    <button
      type="button"
      className="btn btn-primary text-nowrap mr-1"
      onClick={() => openPostModalAction()}
    >
      Add Post
    </button>
  );
};

const mapDispatchToProps = { openPostModalAction };
export default connect(null, mapDispatchToProps)(AddButton);
