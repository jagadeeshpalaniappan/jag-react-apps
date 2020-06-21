import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import UserDeleteModal from "./UserDeleteModal";

const UserDetailsToolbar = ({ user, hidden, onDelete }) => {
  console.log("### UserDetailsToolbar:");
  var history = useHistory();
  const [delModalOpen, setDelModalOpen] = useState(false);
  const openDeleteModal = () => setDelModalOpen(true);
  const closeDeleteModal = () => setDelModalOpen(false);
  const goBack = () => {
    console.log("history.length ", history.length);
    if (history.length > 2) history.goBack();
    else history.push("/users");
  };

  return (
    <div className="d-flex align-items-center">
      {!hidden && (
        <>
          <Button className="ml-2" onClick={goBack}>
            Back
          </Button>
          {user && (
            <>
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
        </>
      )}
    </div>
  );
};

UserDetailsToolbar.propTypes = {};

export default React.memo(UserDetailsToolbar);
