import React from "react";
import UsersList from "../components/UsersList";

function UserPostList({ posts }) {
  console.log("### UserPostList:");

  return (
    <div className="mt-3">
      <legend>Posts</legend>
      {posts && posts.length > 0 && <UsersList users={posts} />}
    </div>
  );
}

UserPostList.propTypes = {};
export default React.memo(UserPostList);
