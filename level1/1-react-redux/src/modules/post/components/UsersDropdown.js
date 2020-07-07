import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import { getPostFilterUsersAction } from "../state/post.action";
import { getUsers } from "../../user/service/user.service";

const DEFAULT_USERS_PAGESIZE = 10;

const getUserDropDownOptions = (users = []) => {
  const options = users.map(({ id, name }) => ({ value: id, label: name }));
  options.push({
    value: null,
    label: "...search for more users ...",
    isDisabled: true,
  });
  return options;
};

const getUserDropDownOptionsAsync = async (inputValue) => {
  const users = await getUsers({
    searchBy: inputValue,
    pageSize: DEFAULT_USERS_PAGESIZE,
    pageBefore: null,
    pageAfter: null,
  });

  return getUserDropDownOptions(users.data);
};

const UsersDropdown = memo(function ({ isMulti, selectedUsers, onChange }) {
  return (
    <AsyncSelect
      isMulti={isMulti}
      value={selectedUsers}
      onChange={onChange}
      cacheOptions
      defaultOptions
      loadOptions={getUserDropDownOptionsAsync}
    />
  );
});

UsersDropdown.propTypes = {};

export default UsersDropdown;
