import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Button, Form, FormFeedback, FormGroup, Input } from "reactstrap";
import { STATUS_TYPES } from "../../common/constants";

function UserForm({ user, status, onSave }) {
  console.log("UserFormContainer:", { user });
  const { register, handleSubmit, errors } = useForm({ defaultValues: user });
  const onSubmit = (data) => {
    console.log({ data, errors });
    onSave(data);
  };

  // console.log({ errors });

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
            innerRef={register({
              required: {
                value: true,
                message: "Name is required",
              },
              maxLength: {
                value: 30,
                message: "Name cannot exceed 30 chars",
              },
            })}
          />
          {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            invalid={!!errors.email}
            innerRef={register({
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="age">Age:</label>
          <Input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            invalid={!!errors.age}
            innerRef={register({
              required: { value: true, message: "Age is required" },
            })}
          />
          {errors.age && <FormFeedback>{errors.age.message}</FormFeedback>}
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
