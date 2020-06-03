import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import UserLayout from "../layout/UserLayout";
import { deleteUserAction, getUserAction } from "../state/user.action";
import LoadingStatus from "../../common/components/LoadingStatus";
import ErrorStatus from "../../common/components/ErrorStatus";

function UserDetails({ user, loading, error, getUser, deleteUser }) {
  let { id } = useParams();

  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleDelete = () => {
    deleteUser(user);
  };

  const handleRetry = () => getUser({ id });

  return (
    <UserLayout
      title="User"
      actions={
        <UserDetailsToolbar
          user={user}
          hidden={loading || error}
          onDelete={handleDelete}
        />
      }
    >
      <LoadingStatus loading={loading} text="Loading user details" />
      <ErrorStatus
        error={error}
        text="Error while getting user details"
        onRetry={handleRetry}
      />
      {user && Object.keys(user).length > 0 && (
        <>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

          <Card body>
            <Row>
              <Col md="1">
                <b>Name:</b>
              </Col>
              <Col>{user.name}</Col>
            </Row>
            <Row>
              <Col md="1">
                <b>Email:</b>
              </Col>
              <Col>{user.email}</Col>
            </Row>
            <Row>
              <Col md="1">
                <b>ID:</b>
              </Col>
              <Col>{user.id}</Col>
            </Row>
            <Row>
              <Col md="1">
                <b>Age:</b>
              </Col>
              <Col>{user.age}</Col>
            </Row>
          </Card>
        </>
      )}
    </UserLayout>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserDetails", state);
  const { loading, error, data } = state.userState.user;
  return {
    loading,
    error,
    user: data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    deleteUser: (user) => dispatch(deleteUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
