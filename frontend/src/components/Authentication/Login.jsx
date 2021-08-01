import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {  toast } from "react-toastify";
import "./Login.css";

function Login() {
  const modelRef = useRef();
  const history = useHistory();

  // states for signup
  const [email, setEmail] = useState("");
  const [first_name, setfname] = useState("");
  const [last_name, setlname] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const baseurl = 'http://localhost:9000';

  // states for login
  const [email2, setEmail2] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSignUp = async () => {
    if(!email || !first_name || !last_name || !gender || !password) return toast('Please fill all the fields.');

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return toast('Invalid email.');
    const data = JSON.stringify({first_name, last_name, email, gender, password});
    const res = await fetch(`${baseurl}/api/signup`, {method: 'POST', headers: {'content-type':'application/json'},body: data});

    const final = await res.json();
    if(final.error) return toast.error(final.error);
    toast.success(final.message);
    setTimeout(() => {
      window.location.assign(window.location);
    },1000);

  }

  const handleLogin = async () => {
    const body = JSON.stringify({email: email2, password: password2});
    const res = await fetch(`${baseurl}/api/login`, {method: 'POST', headers: {'content-type':'application/json'}, body});

    const final = await res.json();
    if(final.error) return toast.error(final.error);
    localStorage.setItem('jwt',final.access_token);
    history.push('/')
    toast.success('Successfully Logged In');
  }

  const inputFormStyle = {
    marginBottom: "20px",
    width: "90%",
    fontSize: "0.8rem",
  };

  const loginBtnStyle = {
    marginBottom: "15px",
    width: "90%",
  };

  const loginBtnStyle2 = {
    marginBottom: "20px",
    width: "75%",
    fontSize: "0.8rem",
  };

  return (
    <div className="container">
      <div className="text">
        <h1>facebook</h1>
        <p>Connect with friends and the world around you on Facebook.</p>
      </div>

      <div className="form">
        <form>
          <input
            value={email2}
            onChange={e => setEmail2(e.target.value)}
            style={inputFormStyle}
            type="email"
            id="email"
            className="nes-input"
            placeholder="Email or phone number"
          />
          <input
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            style={inputFormStyle}
            type="password"
            id="password"
            className="nes-input"
            placeholder="Password"
          />
          <button
            style={loginBtnStyle}
            type="button"
            className="nes-btn is-primary"
            onClick={handleLogin}
          >
            Login
          </button>
          <p
            style={{ marginBottom: "20px" }}
            className="forgot__password nes-pointer"
          >
            Forgot Password ?
          </p>
          <hr />

          <button
            onClick={() => {
              modelRef.current.showModal();
            }}
            style={loginBtnStyle2}
            type="button"
            className="nes-btn is-success"
          >
            Create New Account
          </button>
        </form>
        <dialog
          className="nes-dialog is-rounded signup__modal"
          id="dialog-rounded"
          ref={modelRef}
        >
          <span
            className="crossBtn nes-pointer"
            onClick={() => {
              modelRef.current.removeAttribute("open");
              window.location.assign(window.location);
            }}
          >
            X
          </span>
          <div className="title">
            <p>
              Sign Up <br />
              <span>It’s quick and easy.</span>
            </p>
          </div>
          <div className="inputs">
            <div className="names">
              <input
                type="text"
                id="firstname"
                value={first_name}
                onChange={(e) => setfname(e.target.value)}
                className="nes-input"
                placeholder="First name"
              />
              <input
                value={last_name}
                onChange={(e) => setlname(e.target.value)}
                type="text"
                id="lastname"
                className="nes-input"
                placeholder="Last name"
              />
            </div>
            <div className="email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="nes-input"
                placeholder="Email"
              />
            </div>
            <div className="password">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="nes-input"
                placeholder="Password"
              />
            </div>
            <div className="gender nes-select">
              <select required id="default_select" onChange={e => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">female</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="terms">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookies Policy. You may receive SMS Notifications from us and can
              opt out any time.
            </div>
            <div className="signupBtn">
              <button
                style={{ width: "200px" }}
                type="button"
                className="nes-btn is-success"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Login;
