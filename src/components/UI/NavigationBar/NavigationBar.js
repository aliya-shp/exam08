import React from 'react';
import {Nav, Navbar, NavbarBrand, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const NavigationBar = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">Quotes Home</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavLink>
                    <NavLink tag={RouterNavLink} to="/quotes/">Quotes</NavLink>
                </NavLink>
                <NavLink>
                    <NavLink tag={RouterNavLink} to="/add-quote/">Submit new quote</NavLink>
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default NavigationBar;