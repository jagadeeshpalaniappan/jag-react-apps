import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import StatusQueryError from "../../common/components/StatusQueryError";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import UsersList from "../components/UsersList";
import { apiGetUserTodosAction } from "../state/api/user.getUserTodos.action";

function UserTodoList({ userId, userTodos, loading, error, getUserTodos }) {
  console.log("### UserTodoList:");

  useEffect(() => {
    // onInit:
    getUserTodos({ userId });
  }, [userId, getUserTodos]);

  const handleRetry = () => getUserTodos({ userId });

  return (
    <div className="mt-3">
      <legend>Todos</legend>
      <StatusQueryLoading loading={loading} text="Loading User's Todos" />
      <StatusQueryError
        error={error}
        text="Error while getting User's Todos"
        onRetry={handleRetry}
      />
      {/* TODO: change it to TodoList */}
      {userTodos && userTodos.length > 0 && <UsersList users={userTodos} />}
    </div>
  );
}

UserTodoList.propTypes = {
  userTodos: PropTypes.object.isRequired,
  getUserTodos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserTodoList", state);
  const { loading, error, data } = state.userState.userTodos;
  return {
    loading,
    error,
    userTodos: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserTodos: (userTodos) => dispatch(apiGetUserTodosAction(userTodos)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserTodoList));
