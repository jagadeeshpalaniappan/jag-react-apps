import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import UserDeleteModal from "./UserDeleteModal";

const UserDetailsToolbar = ({ user, hidden, onDelete }) => {
  const [delModalOpen, setDelModalOpen] = useState(false);
  const openDeleteModal = () => setDelModalOpen(true);
  const closeDeleteModal = () => setDelModalOpen(false);

  return (
    <div className="d-flex align-items-center">
      {!hidden && (
        <>
          <Button tag={NavLink} to={`/users`} className="ml-2" exact>
            Back
          </Button>
          <Button className="ml-2" onClick={openDeleteModal}>
            Delete
          </Button>
          <Button
            tag={NavLink}
            to={`/users/edit/${user.id}`}
            color="primary"
            className="ml-2"
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
