import React, { memo } from "react";

import { connect } from "react-redux";
import { apiGetPostsAction } from "../../state/getPosts/actions";
import { getVisiblePosts } from "../../state/selectors";
import ListItem from "./ListItem";

function List({ postIds }) {
  return (
    <ul className="list-group">
      {postIds &&
        postIds.map((postId) => <ListItem key={postId} postId={postId} />)}
    </ul>
  );
}

const mapStateToProps = (state) => ({ postIds: getVisiblePosts(state) });
export default connect(mapStateToProps, null)(memo(List));
