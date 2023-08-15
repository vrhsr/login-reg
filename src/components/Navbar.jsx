import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav
        id="mainNavbar"
        className="navbar navbar-expand-md navbar-dark  py-0 fixed-top"
      >
        <div className="navbar-brand">CTBC</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" id="1">
              <NavLink className="nav-link" to="/">
                Register
              </NavLink>
            </li>
            <li className="nav-item" id="2">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item d-none" id="3">
              <NavLink className="nav-link" to="/home">
                home
              </NavLink>
            </li>
            <li className="nav-item d-none" id="4">
              <NavLink className="nav-link" to="/emailVerify">
                emailVerify
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
