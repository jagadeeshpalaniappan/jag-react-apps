import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
} from "reactstrap";
import { STATUS_TYPES } from "../../common/constants";

// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";

// Error Component
const errorMessage = (error) => {
  return <div className="invalid-feedback">{error}</div>;
};

function UserForm({ user, status, onSave }) {
  console.log("UserFormContainer:", { user });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log({ data, errors });
    onSave(data);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <pre> {JSON.stringify(errors)} </pre> */}

        {/* {user && user.id && (
          <FormGroup>
            <label htmlFor="userId">ID:</label>
            <Input
              type="text"
              id="userId"
              name="id"
              value={formVal.id || ""}
              disabled
            />
          </FormGroup>
        )}
         */}

        <FormGroup>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            invalid={!!errors.name}
            innerRef={register({ required: true, maxLength: 30 })}
          />
          {errors.name && (
            <>
              {errors.name.type === "required" && (
                <FormFeedback>Name is required</FormFeedback>
              )}
              {errors.name.type === "maxLength" && (
                <FormFeedback>Name cannot exceed 30 chars</FormFeedback>
              )}
            </>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            invalid={!!errors.email}
            innerRef={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <>
              {errors.email.type === "required" && (
                <FormFeedback>Email is required</FormFeedback>
              )}
              {errors.email.type === "pattern" && (
                <FormFeedback>Invalid email</FormFeedback>
              )}
            </>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor="age">Age:</label>
          <Input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            invalid={!!errors.age}
            innerRef={register({ required: true, maxLength: 10 })}
          />
          {errors.age && (
            <>
              {errors.age.type === "required" && (
                <FormFeedback>Age is required</FormFeedback>
              )}
            </>
          )}
        </FormGroup>

        <div className="d-flex justify-content-end align-items-center my-3">
          <Button
            tag={NavLink}
            to={user && user.id ? `/users/${user.id}` : `/users`}
            exact
            className="ml-2"
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            className="ml-2"
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

UserForm.propTypes = {
  user: PropTypes.object,
  status: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UserForm;
