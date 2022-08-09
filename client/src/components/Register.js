import React from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';

const Register = () => {
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [username,setUsername]=React.useState('');
  const [password2,setPassword2]=React.useState('');

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(username + ' ' + email + ' ' + password + ' ' + password2);
  }
  
  return (
    <>
    <div className='text-center lg-header'>
      <h3 className="h3 h3-py">Register</h3>
       <form onSubmit={submitHandler}>
       <div className="mb-3">
          <label htmlFor="username" 
            className="form-label">
            Username
          </label>
          <input 
          type="text" 
          className="form-control" 
          id="username" 
          aria-describedby="emailHelp" 
          value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">New Password</label>
          <input type="password" 
          className="form-control"
           id="exampleInputPassword2" 
           value={password2} onChange={(e)=>{setPassword2(e.target.value)}} />
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
        <Link to='/login'>already Have an account ? Login</Link>
    </div>  
    </>
  )
  }

export default Register