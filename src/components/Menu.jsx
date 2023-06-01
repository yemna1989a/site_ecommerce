import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import {urlimage} from "../axios/Api"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useSelector} from "react-redux"
const Menu = () => {
  const mystyle = {
    color: "black",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
};
const {user} = useSelector((state) =>state.auth);
  return (
    <div>
       <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
      
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
            <NavDropdown title="Articles" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/insertarticle">Insert article</NavDropdown.Item>
             
              <NavDropdown.Item as={Link} to="/listarticles">Liste des articles</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/insertcategorie">Insert categorie</NavDropdown.Item>
             
              <NavDropdown.Item as={Link} to="/listcategories">Liste des categories</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Sous categories" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/insertscategorie">Insert sous categorie</NavDropdown.Item>
             
              <NavDropdown.Item as={Link} to="/listscategories">Liste des sous categories</NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Stack direction="row" spacing={2}>
         <h6 style={mystyle}>{user.email}</h6>
          <Avatar alt="Remy Sharp" src={urlimage + user.avatar} />
        </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Menu
