import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useCallback, useEffect } from "react";
import { connectAppContext } from "../../../store/AppContext";
import SearchInput from "../../common/components/SearchInput";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import { useQueryParam } from "../../common/hooks";
import { arrToMap, deepEqualReact } from "../../common/utils/all.utils";
import PostsList from "../components/PostList";
import PostsToolbar from "../components/PostListToolbar";
import PostLayout from "../layout/PostLayout";
import { setPostSearchKeywordAction } from "../state/post.action";

const DEFAULT_PAGINATION = 10;

const GET_USERS = gql`
  query($options: PostsQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        userId
        isActive
      }
      meta {
        before
        after
      }
    }
  }
`;

const Posts = (props) => {
  console.log("### Posts:", props);

  const { searchKeyword, filters, searchPost, getPosts } = props;
  let query = useQueryParam();
  const sortBy = query.get("sortBy");
  const pageSize = query.get("pageSize");
  const pageAfter = query.get("pageAfter");
  const pageBefore = query.get("pageBefore");

  // const [appState, dispatch] = useAppState();
  // console.log("Posts:", { appState }); // TODO: why calling two times?

  const filtersMap = arrToMap(filters || []);
  const filterBy = {};
  // TODO:
  if (filtersMap.users) filterBy.userId = filtersMap.users[0].value; // TODO: support filterBy multiple Users
  if (filtersMap.isActive) filterBy.isActive = filtersMap.isActive === "active";

  // GRAPHQL
  const variables = {
    options: {
      filterBy,
      search: searchKeyword,
      sort: sortBy,
      pagination: {
        size: Number(pageSize) || DEFAULT_PAGINATION,
        before: pageBefore,
        after: pageAfter,
      },
    },
  };
  const [loadPosts, { loading, error, data }] = useLazyQuery(GET_USERS, {
    variables,
  });
  const posts = data ? data.posts.data : [];
  const pagination = data ? data.posts.meta : {};

  console.log("PostList:", { loading, error, data, pagination, filtersMap });

  useEffect(() => {
    console.log("Posts:initApi:");
    loadPosts();
  }, [
    loadPosts,
    getPosts,
    sortBy,
    pageSize,
    searchKeyword,
    filters,
    pageBefore,
    pageAfter,
  ]);

  const handleRetry = useCallback(() => {
    console.log("handleRetry: ");
    loadPosts();
  }, [loadPosts]);

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
      <PostsList posts={posts} pagination={pagination} />
    </PostLayout>
  );
};

Posts.propTypes = {};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    searchKeyword: state.postState.searchKeyword,
    filters: state.postState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchPost: (keyword) => dispatch(setPostSearchKeywordAction(keyword)),
  };
};

// only re-render ExpensiveComponent when the props have deeply changed
const PostsMemoized = React.memo(Posts, deepEqualReact);

export default connectAppContext(
  mapStateToProps,
  mapDispatchToProps,
  PostsMemoized
);
