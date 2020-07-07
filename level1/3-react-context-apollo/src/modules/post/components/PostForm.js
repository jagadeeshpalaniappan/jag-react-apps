import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
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
import { basePath } from "../../../app/AppRoutes";
import UsersDropdown from "./UsersDropdown";

function PostForm({ post = {}, status, onSave, authorInfo = {} }) {
  console.log("### PostForm:");

  const postUser =
    post && post.user ? { label: post.user.name, value: post.user.id } : null;
  const [selectedUser, setSelectedUser] = useState(postUser);

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
    onSave({ ...data, userId: selectedUser.value });
  };
  // console.log({ errors });

  const goBack = () => {
    console.log("history.length ", history.length);
    if (history.length > 2) history.goBack();
    else history.push(basePath.post);
  };

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

        <FormGroup>
          <label htmlFor="user">User:</label>
          <UsersDropdown
            id="user"
            selectedUsers={selectedUser}
            onChange={handleUserSelection}
          />
        </FormGroup>

        {post && post.id && (
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
        )}

        <div className="d-flex justify-content-end align-items-center my-3">
          <Button
            onClick={goBack}
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
