import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ( {handleShow} ) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
       
     

        <div >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/Departments">
                Departments
              </NavLink>
            </li>

          </ul>
        </div>

        <Link className="btn btn-outline-light" onClick={handleShow}>Add Department </Link>

      </div>
    </nav>
  );
};

export default Navbar;