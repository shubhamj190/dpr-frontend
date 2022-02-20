import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";



    const currentTab = (history,path)=>{
        if(history.location.pathname===path){
            return {color:"red"}
        }else{
            return{color:"green"}
        }
    }


 const Menu=({history, path})=> {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"

          >
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/" style={currentTab(history,'/')}>
                  Home
                </Link>
              </li>
              {isAuthenticated() && (<li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/user/dashboard"
                style={currentTab(history,'/user/dashboard')}
                >
                  Dashboard
                </Link>
              </li>)}
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/cart"
                style={currentTab(history,'/cart')}
                >
                  Cart
                </Link>
              </li>
              {!isAuthenticated() && (
                  <Fragment>
                      <li className="nav-item">
                <Link className="nav-link" to="/signup"
                style={currentTab(history,'/signup')}
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={currentTab(history,'/signin')}>
                  Signin
                </Link>
              </li>
                  </Fragment>
              )}
              {isAuthenticated() && (
                  <li className="nav-item">
                  <Link
                    className="nav-link text-warning"
                    to="/signout"
                    tabindex="-1"
                    onClick={()=>{signout(()=>{
                        history.push('/')
                    })}}
                  >
                    Signout
                  </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default withRouter(Menu)