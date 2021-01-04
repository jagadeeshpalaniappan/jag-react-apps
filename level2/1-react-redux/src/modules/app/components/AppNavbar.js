import React from "react";
import { NavLink } from "react-router-dom";

const AppNavbar = ({ title, secondaryTitle }) => {
  console.log("### AppNavbar:");
  return (
    <nav
      className="navbar navbar-light navbar-expand-sm"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <NavLink to="/" activeClassName="active" className="nav-link" exact>
        MyReduxApp1
      </NavLink>

      <div className="navbar-nav">
        <NavLink
          to="/users"
          activeClassName="active"
          className="nav-link"
          exact
        >
          Users
        </NavLink>
        <NavLink
          to="/posts"
          activeClassName="active"
          className="nav-link disabled"
        >
          Posts [TODO]
        </NavLink>
      </div>
    </nav>
  );
};

export default React.memo(AppNavbar);
