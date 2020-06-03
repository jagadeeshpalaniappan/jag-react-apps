import React, { useState } from "react";
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

const AppNavbar = ({ title, secondaryTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand to="/" tag={RRNavLink}>
        {title}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarText className="mr-auto">{secondaryTitle}</NavbarText>
        <Nav navbar>
          <NavItem>
            <NavLink to="/users" activeClassName="active" tag={RRNavLink}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/posts" tag={RRNavLink}>
              Posts
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
