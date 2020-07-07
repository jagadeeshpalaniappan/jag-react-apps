import PropTypes from "prop-types";
import React from "react";
import UserStatusBar from "../container/UserStatusBar";

const UserLayout = ({ children, title, actions }) => {
  console.log("### UserLayout:");
  return (
    <div className="container-fluid">
      <UserStatusBar />
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

UserLayout.propTypes = {
  title: PropTypes.string,
};

export default React.memo(UserLayout);
