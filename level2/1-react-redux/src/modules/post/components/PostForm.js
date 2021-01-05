import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
// import UsersDropdown from "./UsersDropdown";

function PostForm({ post = {}, status, onSave, onCancel, authorInfo = {} }) {
  console.log("### PostForm:");

  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    if (authorInfo.data) {
      setSelectedUser({
        label: authorInfo.data.name,
        value: authorInfo.data.id,
      });
    }
  }, [authorInfo.data, setSelectedUser]);

  var history = useHistory();
  const { register, handleSubmit, errors } = useForm({ defaultValues: post });
  const onSubmit = (data) => {
    console.log("FORM-VALUES:", { data, errors });
    // onSave({ ...data, userId: selectedUser.value });
    if (post && post.id) onSave({ id: post.id, userId: "TMP_USER", ...data });
    else onSave({ ...data, userId: "TMP_USER" });
  };
  // console.log({ errors });

  const handleUserSelection = useCallback((newSelectedUser) => {
    console.log("handleUsersSelection:", { newSelectedUser });
    setSelectedUser(newSelectedUser);
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <pre> {JSON.stringify(errors)} </pre> */}

        <FormGroup>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            invalid={!!errors.title}
            innerRef={register({
              required: {
                value: true,
                message: "Title is required",
              },
              maxLength: {
                value: 30,
                message: "Title cannot exceed 30 chars",
              },
            })}
          />
          {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="body">Body:</label>
          <Input
            type="textarea"
            id="body"
            name="body"
            placeholder="Body"
            invalid={!!errors.body}
            innerRef={register()}
          />
          {errors.body && <FormFeedback>{errors.body.message}</FormFeedback>}
        </FormGroup>
        {/* 
        <FormGroup>
          <label htmlFor="userId">UserId: (TODO)</label>
          <Input
            type="text"
            id="userId"
            name="userId"
            placeholder="UserId"
            invalid={!!errors.userId}
            innerRef={register({
              required: {
                value: true,
                message: "UserId is required",
              },
            })}
          />
          {errors.userId && (
            <FormFeedback>{errors.userId.message}</FormFeedback>
          )}
        </FormGroup> */}
        {/* 
        <FormGroup>
          <label htmlFor="user">User:</label>
          {authorInfo && authorInfo.loading && "Loading User..."}
          {authorInfo && authorInfo.error && (
            <div className="text-danger">Error getting User!</div>
          )}
          {((authorInfo && authorInfo.data) || !post.id) && (
            <UsersDropdown
              id="user"
              selectedUsers={selectedUser}
              onChange={handleUserSelection}
            />
          )}
        </FormGroup> */}

        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="isActive"
              innerRef={register()}
              defaultChecked
            />
            Active
          </Label>
        </FormGroup>

        <div className="d-flex justify-content-end align-items-center my-3">
          <Button
            onClick={onCancel}
            className="ml-2"
            disabled={status && status.loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            className="ml-2"
            disabled={status && status.loading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

PostForm.propTypes = {
  post: PropTypes.object,
  status: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default React.memo(PostForm);
