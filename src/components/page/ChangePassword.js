import { Fragment, useRef } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import classes from "./ChangePassword.module.css";

const ChangePassword = () => {
  const emailInputRef = useRef();

  async function formSubmitHandler(event) {
    event.preventDefault();
    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEI1Or8jiuwtpy390yjOrHfAo4PLT75nA",
        {
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value,
        }
      );
      alert("Password reset link sent successfully!");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Fragment>
      <div className={classes.changePassword}>
        <h2>Reset Password</h2>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="changepassword">
              Enter the email with which you have registered
            </label>
            <input type="email" id="changepassword" ref={emailInputRef} required />
          </div>
          <div className={classes.actions}>
            <button type="submit">Send</button>
          </div>
        </form>

        <p>Already a user?</p>
        <Nav.Link href="/auth" className={classes.link}>
          Log In
        </Nav.Link>
      </div>
    </Fragment>
  );
};

export default ChangePassword;
