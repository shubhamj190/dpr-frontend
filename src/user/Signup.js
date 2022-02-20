import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

import Base from "../core/Base";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: "",
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 sm-3">
          <form>
            <div className="mb-3">
              <label for="exampleInputname" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="exampleInputname"
                aria-describedby="emailHelp"
                value={name}
                onChange={handleChange("name")}
              />
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control mb-3"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleChange("email")}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control mb-3"
                id="exampleInputPassword1"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button type="submit" className="btn btn-success btn-lg mb-3 "
            onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const onSubmit =(event) =>{
    event.preventDefault();
    setValues({...values, error:false})
    signup({name, email, password})
    .then(data=>{
        console.log("DATA",data)
        if(data.email === email){
            setValues({...values,name:"",email:"", password:"",success:true, error:""})
        }
        else{
            setValues({...values, error:true, success:false})
        }
    })
    .catch(error=>{console.log(error)})
  }

  const successMessage =() =>{
      return(
      <div className="row">
          <div className="col-md-6 offset-sm-3">
              <div className="alert alert-success "
              style={{display: success ? "" :"none"}}
              >
                  New account create successfully please <Link to="/signin">Login </Link> !!
              </div>
          </div>
      </div>
  )}

  const errorMessage =() =>{
      return(
      <div className="row">
          <div className="col-md-6 offset-sm-3">
              <div className="alert alert-danger "
              style={{display: error ? "" :"none"}}
              >
                  Something went wrong please try again
              </div>
          </div>
      </div>
  )}

  return (
    <Base title="Signup" description="Please signup to lco user">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
      <p className="text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}
