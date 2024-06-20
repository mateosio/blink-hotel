import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "../utils/axios";
import "./login.scss";


const Login = () => {
  const { setAuth } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [focusInput, setFocusInput] = useState(true);

  //Le doy un focus al input cuando se monta el componente.
  if(userRef.current && focusInput){
    userRef.current.focus();
    setFocusInput(null)
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", 
        {user, pwd}, 
        {
          headers: {
            "Content-Type": "application/json"
        },
      })
            
       const username = response.data?.username;
       const accessToken = response.data?.accessToken;
       console.log(username);
       console.log(accessToken);
      
       setAuth({ username, accessToken });
       setUser('');
       setPwd('');
       navigate(from, { replace: true });
    } catch (error) {
      
      if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if(error.response?.status === 409){
        setErrMsg("You are already login");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="wrapper">
      <div className="form__box login">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input__box">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => (
                setUser(e.target.value),
                setErrMsg("")
              )}
              value={user}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input__box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => (
                setPwd(e.target.value),
                setErrMsg("")
              )}
              value={pwd}
              required
            />
            <FaLock className="icon" />
          </div>
          <button>Sign In</button>
          <div className="register__link">
            <p>
              Don´t have an Account?
              <span className="line">
                <Link to="/register" className="link">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
