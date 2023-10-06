import React, { useState } from "react";
import lock from "../../images/lock.png";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
function MainBody() {
  const [checked, isChecked] = useState("");
  const [registerPage, showRegisterPage] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (checked) {
      if (userData.password !== userData.confirmPassword) {
        return M.toast({ html: "Password & confirmpassword not matched" });
      } else {
        sendData(userData);
      }
    } else {
      alert("please click in checkbox");
    }
  };
  const sendData = (data) => {
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          M.toast({ html: result.error, classes: "#d50000 red accent-4" });
        } else {
          M.toast({ html: result.message, classes: "#1976d2 blue darken-2" });

          showRegisterPage(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const signIn = (e) => {
    e.preventDefault();
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem("jwt", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          M.toast({
            html: "successfully logged in",
            classes: "#1976d2 blue darken-2",
          });
          // setEmail("")
          // setPassword("")
          navigate("/welcomePage");
        }
        if (result.error) {
          M.toast({ html: result.error, classes: "#d50000 red accent-4" });
        }
      });
  };

  return (
    <>
      <Navbar />
      <section id="main-body">
        <section id="laundry-section">
          <h1>Custome solution</h1>
          <p>Checkout our CRM solution for your grocery Stores.</p>
          {registerPage ? (
            <h6>Already Have An Account?</h6>
          ) : (
            <h6>Don't Have An Account?</h6>
          )}

          {!registerPage && (
            <button
              style={{ float: "left", marginLeft: "10px" }}
              onClick={() => showRegisterPage(true)}
            >
              Register
            </button>
          )}
          {registerPage && (
            <button
              style={{ float: "left", marginLeft: "10px" }}
              onClick={() => showRegisterPage(false)}
            >
              Sign in
            </button>
          )}
        </section>
        {!registerPage && (
          <section id="form-section">
            <h3>SIGN IN</h3>

            {/* sign in form */}

            <form onSubmit={(e) => signIn(e)}>
              <div>
                <label htmlFor="mobileNo">email</label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label>Password</label>
                <img
                  src={lock}
                  alt="lock/png"
                  style={{ position: "relative", left: "248px", top: "31px" }}
                />

                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <h6
                style={{
                  position: "relative",
                  left: "180px",
                  top: "-15px",
                  color: "#4552C1",
                  fontWeight: "500",
                }}
              >
                forgot password
              </h6>
              <div>
                <button
                  style={{
                    position: "relative",
                    left: "80px",
                    top: "30px",
                    backgroundColor: "#4552C1",
                  }}
                  className="btn"
                  type="submit"
                >
                  Signin
                </button>
              </div>
            </form>
          </section>
        )}
        {registerPage && (
          <section>
            <h3
              style={{ position: "relative", top: "-90px", color: "#5861AE" }}
            >
              Register
            </h3>

            {/* Register form */}
            <form
              id="register-form"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, name: e.target.value };
                    });
                  }}
                  value={userData.name}
                />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, email: e.target.value };
                    });
                  }}
                  value={userData.email}
                />
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, phone: e.target.value };
                    });
                  }}
                  value={userData.phone}
                />
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, state: e.target.value };
                    });
                  }}
                  value={userData.state}
                />
              </div>
              <div className="form-field">
                <label>District</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, district: e.target.value };
                    });
                  }}
                  value={userData.district}
                />
              </div>
              <div className="form-field">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, address: e.target.value };
                    });
                  }}
                  value={userData.address}
                />
              </div>
              <div className="form-field">
                <label>Pincode</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, pincode: e.target.value };
                    });
                  }}
                  value={userData.pincode}
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, password: e.target.value };
                    });
                  }}
                  value={userData.password}
                />
              </div>
              <div className="form-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, confirmPassword: e.target.value };
                    });
                  }}
                  value={userData.confirmPassword}
                />
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    onClick={(e) => isChecked(e.target.checked)}
                  />
                  <span></span>
                </label>
                <span
                  style={{
                    fontSize: ".7rem",
                    position: "relative",
                    top: "-9px",
                    left: "-5px",
                    color: "#5861AE",
                  }}
                >
                  I agree to Terms & Condition receiving marketing and
                  promotional materials
                </span>
              </div>
              <div>
                <button
                  style={{
                    position: "relative",
                    left: "-200px",
                    backgroundColor: "#4552C1",
                  }}
                  className="btn"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </section>
        )}
      </section>
      <footer>
        <div className="footer">
          <div className="row">
            <a><i className="fa fa-facebook"></i></a>
            <a><i className="fa fa-instagram"></i></a>
            <a><i className="fa fa-youtube"></i></a>
            <a><i className="fa fa-twitter"></i></a>
          </div>

          <div className="row">
            <ul>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>

          <div className="row">
            Custome Copyright © 2023 - All rights reserved
          </div>
        </div>
      </footer>
    </>
  );
}
export default MainBody;
