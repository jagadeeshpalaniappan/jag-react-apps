import React, { useState, useCallback } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { basePath } from "./AppRoutes";

const AppNavbarBrand = ({ title }) => {
  console.log("### AppNavbarBrand:");
  return (
    <NavbarBrand to="/" tag={RRNavLink} exact>
      {title}
    </NavbarBrand>
  );
};

const AppNavbarBrandMemoz = React.memo(AppNavbarBrand);

const AppNavbar = ({ title, secondaryTitle }) => {
  console.log("### AppNavbar:");
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, [setIsOpen]);

  return (
    <Navbar color="light" light expand="md">
      <AppNavbarBrandMemoz title={title} />
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarText className="mr-auto">{secondaryTitle}</NavbarText>
        <Nav navbar>
          <NavItem>
            <NavLink
              to={basePath.user}
              activeClassName="active"
              tag={RRNavLink}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/posts" activeClassName="active" tag={RRNavLink}>
              Posts
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default React.memo(AppNavbar);
