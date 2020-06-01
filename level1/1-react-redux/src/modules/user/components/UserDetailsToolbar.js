import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import UserDeleteModal from "./UserDeleteModal";
import { STATUS_TYPES } from "../../common/constants";

const UserDetailsToolbar = ({ user, status, onDelete }) => {
  const [delModalOpen, setDelModalOpen] = useState(false);
  const openDeleteModal = () => setDelModalOpen(true);
  const closeDeleteModal = () => setDelModalOpen(false);

  const deleteSuccess = status.msg === "User Deleted Successfully";
  return (
    <div className="d-flex align-items-center">
      {!deleteSuccess && (
        <>
          <Button tag={NavLink} to={`/users`} className="ml-2">
            Back
          </Button>
          <Button
            className="ml-2"
            onClick={openDeleteModal}
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Delete
          </Button>
          <Button
            tag={NavLink}
            to={`/users/edit/${user.id}`}
            color="primary"
            className="ml-2"
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Edit
          </Button>
          <UserDeleteModal
            item={user}
            isOpen={delModalOpen}
            onOk={() => {
              closeDeleteModal();
              onDelete();
            }}
            onCancel={closeDeleteModal}
          />
        </>
      )}
    </div>
  );
};

UserDetailsToolbar.propTypes = {};

export default UserDetailsToolbar;
