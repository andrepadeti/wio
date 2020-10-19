import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navigation = ({ games }) => {
  return (
    <Navbar bg="white" variant="light" expand="md">
      <LinkContainer to="/">
        <Navbar.Brand>
          <FontAwesomeIcon icon="graduation-cap" /> Language Games
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="uncollapsed-navbar" />
      <Navbar.Collapse id="uncollapsed-navbar">
        <Nav className="mr-auto justify-content-stretch">
          <LinkContainer to="/">
            <Nav.Link>
              <FontAwesomeIcon icon="home" /> Home
            </Nav.Link>
          </LinkContainer>
          <NavDropdown
            title={
              <span>
                <FontAwesomeIcon icon="dice" /> Games
              </span>
            }
            id="nav-dropdown"
          >
            {games.map((game, index) => (
              <LinkContainer key={index} to={game.url}>
                <NavDropdown.Item>{game.game}</NavDropdown.Item>
              </LinkContainer>
            ))}
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link>
            <FontAwesomeIcon icon="sign-in-alt" /> Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
