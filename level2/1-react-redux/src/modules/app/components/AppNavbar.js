import React from "react";
import { NavLink } from "react-router-dom";
import { routeConfig } from "../config";

const AppNavbar = () => {
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
          to={routeConfig.user}
          activeClassName="active"
          className="nav-link"
          exact
        >
          Users
        </NavLink>
        <NavLink
          to={routeConfig.post}
          activeClassName="active"
          className="nav-link"
          exact
        >
          Posts
        </NavLink>
      </div>
    </nav>
  );
};

export default React.memo(AppNavbar);
