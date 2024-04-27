import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import "../index.css";
import "./register.scss";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [focus, setFocus] = useState(true);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  if (userRef.current && focus) {
    userRef.current.focus();
    setFocus(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, pwd }),
      });

      setSuccess(true);
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link>Sign In</Link>
          </p>
        </section>
      ) : (
        <section className="register_section">
          <div className="form__box login">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <form onSubmit={handleSubmit}>
              <h1>Register</h1>
              <div className="input__box">
                <label htmlFor="username">
                  Username:
                  <FaCheck className={validName ? "valid" : "hide"} />
                  <FaTimes
                    className={validName || !user ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => (
                    setUser(e.target.value),
                    setErrMsg(""),
                    setValidName(USER_REGEX.test(user))
                  )}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />

                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div className="input__box">
                <label htmlFor="password">
                  Password:
                  <FaCheck className={validPwd ? "valid" : "hide"} />
                  <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => (
                    setPwd(e.target.value),
                    setErrMsg(""),
                    setValidPwd(PWD_REGEX.test(pwd)),
                    setValidMatch(pwd === matchPwd)
                  )}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <div className="input__box">
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FaCheck
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FaTimes
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => (
                    setMatchPwd(e.target.value),
                    setValidMatch(pwd === matchPwd),
                    setErrMsg("")
                  )}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  Must match the first password input field.
                </p>
              </div>
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
            <div className="register__link">
              <p>
                Already registered?
                <br />
                <span className="line">
                  {/*put router link here*/}
                  <Link to="/login" className="link">Sign In</Link>
                </span>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
