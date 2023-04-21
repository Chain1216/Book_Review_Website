import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">CIS 550 Amazon Book Review</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/books">
                Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/authors" >
                Authors
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/categories">
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/Dashboard">
                Your Library
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
