import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  const { routes } = props;
  return (
    <div>
      <Navbar color="light" expand="md" light>
        <NavbarBrand tag={ReactLink} to="/">
          react-agenda
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse navbar isOpen={open}>
          <Nav className="me-auto" navbar>
            {routes.map((e, index) => {
              var jsx = "";
              if (e.component == null) {
                jsx = (
                  <NavItem key={index}>
                    <NavLink href={e.path}>{e.name}</NavLink>
                  </NavItem>
                );
              } else {
                jsx = (
                  <NavItem key={index}>
                    <NavLink tag={ReactLink} to={e.path}>
                      {e.name}
                    </NavLink>
                  </NavItem>
                );
              }
              return jsx;
            })}
            {/* <NavItem>
              <NavLink href="https://bio.link/emiliomendez_">Bio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/emilioCode">GitHub</NavLink>
            </NavItem> */}
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
