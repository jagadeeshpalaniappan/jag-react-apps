import { gql } from "apollo-boost";
import React, { memo } from "react";
import AsyncSelect from "react-select/async";
import { client } from "../../../store/apollo";

const DEFAULT_PAGINATION = 10;

export const getUsers = async (config) => {
  console.log("fetch::getUsers::", config);

  const query = gql`
    query($options: UsersQueryOptions) {
      users(options: $options) {
        data {
          id
          name
        }
        meta {
          before
          after
        }
      }
    }
  `;

  const options = {
    search: config.searchBy,
    //   sort: sortBy,
    pagination: {
      size: DEFAULT_PAGINATION,
      // before: pageBefore,
      // after: pageAfter,
    },
  };
  const response = await client.query({ query, variables: { options } });

  console.log("fetch::getUsers:: response:", response);
  const { data, meta } = response.data.users;
  return { data, pagination: meta };
};

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
  onChange,
}) {
  //   const [users, setUsers] = useState(null);
  //   useEffect(async () => {
  //     const userList = await getUserDropDownOptionsAsync();
  //     getUserDropDownOptions(users.data);
  //   }, [getUsers]);

  return (
    <AsyncSelect
      isMulti={isMulti}
      value={selectedUsers}
      onChange={onChange}
      loadOptions={getUserDropDownOptionsAsync}
    />
  );
});

UsersDropdown.propTypes = {};

export default UsersDropdown;
