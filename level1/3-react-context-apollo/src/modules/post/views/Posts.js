import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import SearchInput from "../../common/components/SearchInput";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import { useQueryParam } from "../../common/hooks";
import { deepEqualReact } from "../../common/utils/all.utils";
import PostList from "../components/PostList";
import PostsToolbar from "../components/PostListToolbar";
import PostLayout from "../layout/PostLayout";
import {
  getPostsAction,
  setPostSearchKeywordAction,
} from "../state/post.action";

const Posts = (props) => {
  console.log("### Posts:", props);
  const {
    posts,
    loading,
    error,
    pagination,
    searchKeyword,
    filters,
    searchPost,
    getPosts,
  } = props;
  let query = useQueryParam();
  const sortBy = query.get("sortBy");
  const pageSize = query.get("pageSize");
  const pageAfter = query.get("pageAfter");
  const pageBefore = query.get("pageBefore");

  const initApi = useCallback(() => {
    console.log("Posts:initApi:");
    getPosts({
      sortBy,
      filters,
      searchBy: searchKeyword,
      pageSize,
      pageBefore,
      pageAfter,
    });
  }, [
    getPosts,
    sortBy,
    pageSize,
    searchKeyword,
    filters,
    pageBefore,
    pageAfter,
  ]);

  useEffect(() => {
    console.log("Posts:onInit:");
    initApi();
  }, [initApi]);

  const handleRetry = useCallback(() => {
    console.log("handleRetry: ");
    initApi(pagination);
  }, [initApi, pagination]);

  const handleSearch = useCallback(
    (keyword) => {
      console.log("handleSearch: ", { keyword });
      searchPost(keyword);
    },
    [searchPost]
  );

  return (
    <PostLayout title="Posts" actions={<PostsToolbar />}>
      <div className="my-3">
        <SearchInput
          value={searchKeyword}
          placeholder="Search post"
          onChange={handleSearch}
        />
      </div>
      <StatusQueryLoading loading={loading} text="Loading posts" />
      <StatusQueryError
        error={error}
        text="Error while getting posts"
        onRetry={handleRetry}
      />
      <PostList posts={posts} pagination={pagination} />
    </PostLayout>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  const { loading, error, data } = state.postState.posts;
  const { data: posts, pagination } = data;
  return {
    loading,
    error,
    posts, // SERVER-SEARCH
    pagination,
    searchKeyword: state.postState.searchKeyword,
    filters: state.postState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (config) => dispatch(getPostsAction(config)),
    searchPost: (keyword) => dispatch(setPostSearchKeywordAction(keyword)),
  };
};

// only re-render ExpensiveComponent when the props have deeply changed
const PostsMemoized = React.memo(Posts, deepEqualReact);
export default connect(mapStateToProps, mapDispatchToProps)(PostsMemoized);
