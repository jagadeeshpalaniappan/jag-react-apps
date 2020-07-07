import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { basePath } from "../../../app/AppRoutes";
import PostDeleteModal from "./PostDeleteModal";

const PostDetailsToolbar = ({ post, hidden, onDelete }) => {
  console.log("### PostDetailsToolbar:");
  var history = useHistory();
  const [delModalOpen, setDelModalOpen] = useState(false);
  const openDeleteModal = () => setDelModalOpen(true);
  const closeDeleteModal = () => setDelModalOpen(false);
  const goBack = () => {
    console.log("history.length ", history.length);
    if (history.length > 2) history.goBack();
    else history.push(basePath.post);
  };

  return (
    <div className="d-flex align-items-center">
      {!hidden && (
        <>
          <Button className="ml-2" onClick={goBack}>
            Back
          </Button>
          {post && (
            <>
              <Button className="ml-2" onClick={openDeleteModal}>
                Delete
              </Button>
              <Button
                tag={NavLink}
                to={`${basePath.post}/edit/${post.id}`}
                color="primary"
                className="ml-2"
              >
                Edit
              </Button>
              <PostDeleteModal
                item={post}
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

PostDetailsToolbar.propTypes = {};

export default React.memo(PostDetailsToolbar);
