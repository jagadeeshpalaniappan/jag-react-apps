import React from "react";
import { Route, Switch } from "react-router-dom";
import { basePath } from "../../../app/AppRoutes";
import CreatePostView from "../views/CreatePost";
import EditPostView from "../views/EditPost";
import PostDetailsView from "../views/PostDetails";
import PostsView from "../views/Posts";

const PostRoutes = () => {
  return (
    <Switch>
      <Route exact path={basePath.post}>
        <PostsView />
      </Route>
      <Route path={`${basePath.post}/create`}>
        <CreatePostView />
      </Route>
      <Route path={`${basePath.post}/edit/:id`}>
        <EditPostView />
      </Route>
      <Route path={`${basePath.post}/:id`}>
        <PostDetailsView />
      </Route>
    </Switch>
  );
};

export default PostRoutes;
