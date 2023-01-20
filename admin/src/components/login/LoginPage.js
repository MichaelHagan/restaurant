import React, {useState} from 'react';
import './LoginPage.css';
import { useLogin, useNotify } from 'react-admin';



export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const login = useLogin();
    const notify = useNotify();
    
    const handleSubmit = async (e) => {    
        e.preventDefault();
        await login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
        window.location.reload();
   };


  return (
  <div>
         <div className="bg-img"></div>
      <div className="form-container login">
        <h1 className="title">Login</h1>
        <div className="registration-form row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} className="container">
            <div className="input-error">{errors.inputs}</div>
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                />
                <div className="input-error">{errors.email}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                />
                <div className="input-error">{errors.password}</div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
              {/* <div className="container signin">
                <p>
                  Don't have an account? <Link to="/">Sign Up</Link>.
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

                }