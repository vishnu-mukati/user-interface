import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import classes from './AuthForm.module.css';
import axios from 'axios';
import { authActions } from '../../store/AuthSlice';
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  const history = useHistory();

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);



  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function formSubmitHandler(event) {
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;
    // const enteredName = nameInputRef.current.value;

    const enteredEmail = emailInputRef.current?.value || ""; 
    const enteredPassword = passwordInputRef.current?.value || ""; 
    const enteredName = nameInputRef.current?.value || ""; 


    setIsLoading(true);


    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-4zGintfY6F596VqLXCPFAoAlQGVK_N4'

    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-4zGintfY6F596VqLXCPFAoAlQGVK_N4'
      const enteredConfirmPassword = confirmpasswordInputRef.current.value;
      if (enteredConfirmPassword !== enteredPassword) {
        alert('password does not match');
        return;
      }

    };

    let token;

    try {
      const response = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      setIsLoading(false);
      token = response.data.idToken; 

      // if(response && response.data){
      dispatch(authActions.isLogin({ email: enteredEmail, token: token }))

      if (response.status === 200) {
        console.log('User has successfully signed up');
        // const userInforesponse = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
        //   {
        //     idToken: token,
        //   }
        // );
        // const emailvarified = userInforesponse.data.users[0].emailVarified;
        // dispatch(authActions.login({emailVarified : emailvarified}))
      }
      // }


    } catch (err) {
      alert(err.response.data.error.message);
      setIsLoading(false);
    }

    const idToken = localStorage.getItem('token');


    if (!isLogin) {
      try {
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-4zGintfY6F596VqLXCPFAoAlQGVK_N4',
          {
            requestType: "VERIFY_EMAIL",
            idToken: token,
          },
        )

        await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-4zGintfY6F596VqLXCPFAoAlQGVK_N4',
          {
            idToken: token,
            displayName: enteredName,
            returnSecureToken: true,
          }
        );
        history.push("/");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'signup'}</h1>
      <form onSubmit={formSubmitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required ref={nameInputRef}/>
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (<div className={classes.control}>
          <label htmlFor='confirm'>Confirm Password</label>
          <input
            type='password'
            id='confirm'
            required
            ref={confirmpasswordInputRef}
          />
        </div>)}


        <div className={classes.actions}>
          {!isLoading && isLogin ? <button type='submit' className={classes.actions}>  {isLoading ? "Sending request..." : "Login"} </button> : <button type='submit' className={classes.actions} > {isLoading ? "Sending request..." : "signup"} </button>}

        </div>

        <div>
          <a href="/changepassword" className={classes.forgotPassword}>
            Forgot Password?
          </a>
        </div>

        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Have an account?Login'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

