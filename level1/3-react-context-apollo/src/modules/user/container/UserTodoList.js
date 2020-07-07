import React from "react";
import UsersList from "../components/UsersList";

function UserTodoList({ todos }) {
  console.log("### UserTodoList:");

  return (
    <div className="mt-3">
      <legend>Todos</legend>
      {todos && todos.length > 0 && <UsersList users={todos} />}
    </div>
  );
}

UserTodoList.propTypes = {};
export default React.memo(UserTodoList);
