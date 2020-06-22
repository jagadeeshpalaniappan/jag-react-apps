import PropTypes from "prop-types";
import React from "react";
import PostStatusBar from "../container/PostStatusBar";

const PostLayout = ({ children, title, actions }) => {
  console.log("### PostLayout:");
  return (
    <div className="container-fluid">
      <PostStatusBar />
      <div>
        <div className="d-flex align-items-center my-3">
          <h3 className="flex-grow-1 m-0">{title}</h3>
          {actions}
        </div>
      </div>
      {children}
    </div>
  );
};

PostLayout.propTypes = {
  title: PropTypes.string,
};

export default React.memo(PostLayout);
