import React from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';

const Login = () => {
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(email + ' ' + password);
  }
  
  return (
    <>
    <div className='text-center lg-header'>
      <h3 className="h3 h3-py">Login</h3>
       <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" 
            className="form-label">
            Email address
          </label>
          <input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          value={email} onChange={(e)=>{setEmail(e.target.value)}} />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" 
          className="form-control"
           id="exampleInputPassword1" 
           value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" 
          className="form-check-input"
           id="exampleCheck1" />

          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" 
        className="btn btn-primary">
          Submit</button>
      </form> <br />
        <Link to='/register'>didn't have account ? Register</Link>
    </div>  
    </>
  )
  }

export default Login