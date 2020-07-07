import React, { memo } from "react";
import { Card } from "reactstrap";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import StatusQueryError from "../../common/components/StatusQueryError";

const PostCard = memo(function PostCard({ post, loading, error, handleRetry }) {
  return (
    <div>
      <StatusQueryLoading loading={loading} text="Loading post details" />
      <StatusQueryError
        error={error}
        text="Error while getting post details"
        onRetry={handleRetry}
      />

      {post && Object.keys(post).length > 0 && (
        <>
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}

          <Card body>
            <div>
              <label>ID:</label>
              <legend>{post.id}</legend>
            </div>
            <div>
              <label>Title:</label>
              <legend>{post.title}</legend>
            </div>
            <div>
              <label>Body:</label>
              <legend>{post.body}</legend>
            </div>
            <div>
              <label>Author:</label>
              <legend>
                {post.user.name} (Id: {post.user.id})
              </legend>
            </div>
            <div>
              <label>Active:</label>
              <legend>{post.isActive ? "Yes" : "No"}</legend>
            </div>
          </Card>
        </>
      )}
    </div>
  );
});

PostCard.propTypes = {};

export default PostCard;
