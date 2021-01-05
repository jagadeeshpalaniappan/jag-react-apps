import React from "react";
import Page from "src/modules/app/components/Page";
import PostList from "../components/PostList";
import PostModal from "../components/PostModal";
import { DeletePostStatus } from "../components/PostStatus";
import PostToolbar from "../components/PostToolbar";

const PostsIndexView = () => {
  console.log("PostsIndexView");
  return (
    <Page className="container" title="Posts">
      <h3 className="mt-3">Posts: </h3>
      <PostToolbar />
      <DeletePostStatus />
      <PostList />
      <PostModal />
    </Page>
  );
};

export default PostsIndexView;
