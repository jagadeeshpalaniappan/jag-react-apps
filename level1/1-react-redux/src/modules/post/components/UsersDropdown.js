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
    pageSize: 10,
    pageBefore: null,
    pageAfter: null,
  });

  return getUserDropDownOptions(users.data);
};

const UsersDropdown = memo(function ({
  isMulti,
  selectedUsers,
  defaultFilterUsers,
  getFilterUsers,
  onChange,
}) {
  useEffect(() => {
    getFilterUsers({
      searchBy: null,
      pageSize: DEFAULT_USERS_PAGESIZE,
      pageBefore: null,
      pageAfter: null,
    });
  }, [getFilterUsers]);

  return (
    <AsyncSelect
      isMulti={isMulti}
      value={selectedUsers}
      onChange={onChange}
      defaultOptions={defaultFilterUsers}
      loadOptions={getUserDropDownOptionsAsync}
    />
  );
});

UsersDropdown.propTypes = {};

const mapStateToProps = (state) => {
  console.log("UsersDropdown:", state);
  return {
    defaultFilterUsers: getUserDropDownOptions(
      state.postState.filterUsers.data.data
    ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getFilterUsers: (config) => dispatch(getPostFilterUsersAction(config)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDropdown);
