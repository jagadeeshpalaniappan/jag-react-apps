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
          to={routeConfig.user1}
          activeClassName="active"
          className="nav-link"
          exact
        >
          Users1
        </NavLink>
        <NavLink
          to={routeConfig.user2}
          activeClassName="active"
          className="nav-link"
          exact
        >
          Users2
        </NavLink>
      </div>
    </nav>
  );
};

export default React.memo(AppNavbar);
