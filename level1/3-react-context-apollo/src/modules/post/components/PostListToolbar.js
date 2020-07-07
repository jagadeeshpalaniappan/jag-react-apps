import React from "react";
import { FaPlus } from "react-icons/fa";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import PageSizeDropdown from "../../common/components/PageSizeDropdown";
import PostFiltersButton from "../container/PostFiltersButton";
import PostSortDropdown from "./PostSortDropdown";
import { basePath } from "../../../app/AppRoutes";

const PostsToolbar = () => {
  console.log("### PostsToolbar:");
  return (
    <div className="d-flex align-items-center">
      {/* 
      <Button className="ml-2">Import</Button>
      <Button className="ml-2">Export</Button>
      <Button className="ml-2">Delete All</Button>
       */}
      <Button
        tag={NavLink}
        to={`${basePath.post}/create`}
        color="primary"
        className="ml-2"
        exact
      >
        <div className="d-flex align-items-center">
          <FaPlus className="mr-2" />
          <span>Add post</span>
        </div>
      </Button>
      <PostFiltersButton />
      <PageSizeDropdown />
      <PostSortDropdown />
    </div>
  );
};

PostsToolbar.propTypes = {};
export default React.memo(PostsToolbar);
