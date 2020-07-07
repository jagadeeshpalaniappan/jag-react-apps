import React from "react";
import { useRouteMatch, NavLink } from "react-router-dom";

import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

const PostListItem = ({ item, ...rest }) => {
  console.log("### PostListItem:");
  let { path } = useRouteMatch();
  return (
    <ListGroupItem tag={NavLink} to={`${path}/${item.id}`} {...rest}>
      <ListGroupItemHeading>{item.title}</ListGroupItemHeading>
      <ListGroupItemText>
        {Object.keys(item).map(
          (key) =>
            ["id", "name"].indexOf(key) === -1 &&
            typeof item[key] === "string" && (
              <span key={key}>
                {" #"}
                {key}: {item[key]}
              </span>
            )
        )}
      </ListGroupItemText>
    </ListGroupItem>
  );
};

export default React.memo(PostListItem);
