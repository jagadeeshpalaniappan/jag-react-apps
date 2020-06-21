import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { STATUS_TYPES } from "../../common/constants";

function UserForm({ user, status, onSave }) {
  console.log("### UserForm:");
  const { register, handleSubmit, errors } = useForm({ defaultValues: user });
  const onSubmit = (data) => {
    console.log("FORM-VALUES:", { data, errors });
    onSave(data);
  };

  // console.log({ errors });

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <pre> {JSON.stringify(errors)} </pre> */}

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
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            invalid={!!errors.username}
            innerRef={register({
              required: { value: true, message: "Username is required" },
            })}
          />
          {errors.username && (
            <FormFeedback>{errors.username.message}</FormFeedback>
          )}
        </FormGroup>

        <FormGroup>
          <label htmlFor="sexGroup">Sex:</label>
          <FormGroup check>
            <Label check className="pr-5">
              <Input
                type="radio"
                name="sex"
                value="male"
                defaultChecked
                innerRef={register()}
              />{" "}
              Male
            </Label>

            <Label check>
              <Input
                type="radio"
                name="sex"
                value="female"
                innerRef={register()}
              />{" "}
              Female
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Role</Label>
          <Input
            type="select"
            name="role"
            id="exampleSelect"
            invalid={!!errors.role}
            innerRef={register({
              required: { value: true, message: "Role is required" },
            })}
          >
            <option value="admin">Admin</option>
            <option value="dev">Devloper</option>
            <option value="manager">Manager</option>
          </Input>
          {errors.role && <FormFeedback>{errors.role.message}</FormFeedback>}
        </FormGroup>

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
