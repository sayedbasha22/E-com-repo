import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow">
      <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">MyEcom</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="mx-auto d-flex" style={{ width: '60%' }}>
          <FormControl 
            type="search" 
            placeholder="Search for Mobiles, Clothes, T-Shirts..." 
            className="me-2" 
          />
          <Button variant="light">Search</Button>
        </Form>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/cart" className="fw-bold">Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
