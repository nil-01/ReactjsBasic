import React from 'react'
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar(props) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('authToken');
    props.isAuthenticated(false);
    navigate('/');
  };
  return (
    <>
<nav className= {`navbar navbar-expand-lg  navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/coupons">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">{props.EmployeeList}</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/add-coupon">{props.AddEmployee}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/coupons">Coupon List</Link>
        </li>
      </ul>

        <div>
          <button className='btn btn-danger me-2' onClick={logout}>
            Logout
          </button>
        </div>
      <form className="d-flex" role="search">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode}/>
        <label className= {`form-check-label  ${props.fontColor}`} >{props.btnText}</label>
      </div>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

Navbar.propTypes = {
    title: PropTypes.string,
    EmployeeList: PropTypes.string,
    AddEmployee: PropTypes.string,
  };

  Navbar.defaultProps = {
    title: 'Add Title'
  };
