import React from "react";
import { connect } from "react-redux";
import { apiDeletePostAction } from "../../state/deletePost/actions";
import { openPostModalAction } from "../../state/postModal/actions";

const ListItem = ({ post, apiDeletePostAction, openPostModalAction }) => {
  console.log("ListItem");
  return (
    <li className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{post.title}</h5>
        <div>
          <a
            href="#"
            className="mr-2"
            onClick={() => openPostModalAction(post)}
          >
            Edit
          </a>
          <a href="#" onClick={() => apiDeletePostAction(post)}>
            Delete
          </a>
        </div>
      </div>
      <div className="mb-1">
        <small>{post.body}</small>
        <span className="badge badge-light mr-1">active</span>
      </div>
    </li>
  );
};

const mapDispatchToProps = { apiDeletePostAction, openPostModalAction };
export default connect(null, mapDispatchToProps)(React.memo(ListItem));
