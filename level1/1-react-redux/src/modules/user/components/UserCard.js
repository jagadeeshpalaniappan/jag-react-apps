import React, { memo } from "react";
import { Card } from "reactstrap";
import StatusQueryLoading from "../../common/components/StatusQueryLoading";
import StatusQueryError from "../../common/components/StatusQueryError";

const UserCard = memo(function UserCard({ user, loading, error, handleRetry }) {
  return (
    <div>
      <StatusQueryLoading loading={loading} text="Loading user details" />
      <StatusQueryError
        error={error}
        text="Error while getting user details"
        onRetry={handleRetry}
      />

      {user && Object.keys(user).length > 0 && (
        <>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

          <Card body>
            <div>
              <label>ID:</label>
              <legend>{user.id}</legend>
            </div>
            <div>
              <label>Name:</label>
              <legend>{user.name}</legend>
            </div>
            <div>
              <label>Email:</label>
              <legend>{user.email}</legend>
            </div>
            <div>
              <label>Username:</label>
              <legend>{user.username}</legend>
            </div>
            <div>
              <label>Sex:</label>
              <legend>{user.sex}</legend>
            </div>
            <div>
              <label>Role:</label>
              <legend>{user.role}</legend>
            </div>
            <div>
              <label>Active:</label>
              <legend>{user.isActive ? "Yes" : "No"}</legend>
            </div>
          </Card>
        </>
      )}
    </div>
  );
});

UserCard.propTypes = {};

export default UserCard;
