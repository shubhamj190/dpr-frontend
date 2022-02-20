import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Base from '../core/Base'

export default function Signin() {

    const [values, setValues] = useState({
        email:"ten@gmail.com",
        password:"12345",
        success:"",
        error:"",
        loading:false,
        didRedirect:false
    })

    const {email, password, success, error, loading, didRedirect} = values

    const onSubmit =(event)=>{
    event.preventDefault()
    signin({email, password})
    .then(data=>{
        console.log(data)
        if(data.token){
            // let sessionToken = data.token
            authenticate(data , ()=>{
                console.log("TOKEN ADDED")
                setValues({...values, didRedirect:true, success:true, error:false, email:"", password:""})
            })
        }else{
            setValues({...values,loading:false, error:true})
        }
    }).catch(error =>console.log(error))
    }

    const performDidRdirect = () =>{
        if(isAuthenticated){
            return <Redirect to="/"/>
        }
    }

    const loadMessage =() =>{
        return(
                loading && (
                    <div className="alert alert-info">
                        <h2>Loading...</h2>
                    </div>
                )
            )
    }

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

    const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 sm-3">
              <form>
                <div className="mb-3">
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

      const successMessage =() =>{
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3">
                <div className="alert alert-success "
                style={{display: success ? "" :"none"}}
                >
                    logged in successfully <Link to="/signin">Login </Link> !!
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
        <Base title="Sign In" description="Please sign in to purchase the item !!">
            {loadMessage()}
            {successMessage()}
            {errorMessage()}
            {signInForm()}
            <p className="text-center">{JSON.stringify(values)}</p>
            {performDidRdirect}
        </Base>
    )
}
