import React, { useState, useEffect } from 'react';
import './Login.css';
import googlelogo from '../../Assets/img/google-logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerifyCode, setIsVerifyCode] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [phone, setPhone] = useState("+962");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggle = () => {
    setIsSignIn(!isSignIn);
    setError("");
    setIsForgotPassword(false);
    setIsVerifyCode(false);
    setIsResetPassword(false);
  };

  const handleSignUp = async () => {
    const signUpData = {
      userType: "Student",
      userName,
      userEmail,
      phone,
      password,
      roles: ["Student"],
    };
    try {
      await axios.post('http://localhost:5236/api/Student/StudentRigester', signUpData);
      toggle();
    } catch (error) {
      setError("Sign up error: " + error.response?.data?.message || error.message);
    }
  };

  const getUserInfoFromToken = (token) => {
    if (!token) return { role: null };
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      const role = decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return { role: null };
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();  // Prevent default form submission
    try {
      const response = await axios.post(`http://localhost:5236/api/Users/Login?email=${signInEmail}&password=${signInPassword}`);
      const role1 = getUserInfoFromToken(response.data.token);
      dispatch(login({
        token: response.data.token,
        role: role1,
        isProfileCreated: response.data.isProfileCreated,
      }));

      // Navigate based on the role
      if (role1 === 'Driver' && !response.data.isProfileCreated) {
        navigate('/CreateProfile', { replace: true });
      } else {
        if (role1 === 'Student') {
          navigate('/StudentAnnouncement');
        } else if (role1 === 'Driver') {
          navigate('/DriverAnnouncement');
        } else if (role1 === 'Admin') {
          navigate('/AdminDashboard');
        }
      }
    } catch (error) {
      setError("Sign in error: " + error.response?.data?.message || error.message);
    }
  };

  const handleForgetPassword = async () => {
    try {
      // Send the email to the backend for verification (or OTP)
      await axios.post(`http://localhost:5236/api/Users/ResetPassword?email=${forgetPasswordEmail}`);
      
      // Transition to the OTP verification form
      setIsForgotPassword(false);  // Hide the Forgot Password form
      setIsVerifyCode(true);       // Show the OTP verification form
    } catch (error) {
      setError("Forget Password error: " + error.response?.data?.message || error.message);
    }
  };
  
  

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError("Verification code cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5236/api/Users/ValidateCode?code=${verificationCode}`);
      
      if (response.data) {
        setIsVerifyCode(false);
        setIsResetPassword(true);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError("Verification error: " + (error.response.data.message || error.response.statusText));
      } else if (error.request) {
        setError("Verification error: No response from the server. Please try again later.");
      } else {
        setError("Verification error: " + error.message);
      }
    }
  };
  
  

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (input.startsWith("+962") && input.length <= 13 && /^\+962\d*$/.test(input)) {
      setPhone(input);
    }
  };

  const handleNewPassword = async () => {
    try {
      await axios.post(`http://localhost:5236/api/Users/NewPassword?newPassword=${newPassword}&code=${verificationCode}`);
      alert("Password reset successfully!");
      setIsResetPassword(false);
      navigate('/Login', { replace: true });
    } catch (error) {
      setError("Reset password error: " + error.response?.data?.message || error.message);
    }
  };

  const showForgetPassword = () => {
    setIsForgotPassword(true);
    setError("");
  };

useEffect(() => {
    const storedEmail = localStorage.getItem("forgetPasswordEmail");
    console.log('Stored Email on mount:', storedEmail);
    if (storedEmail) {
      setForgetPasswordEmail(storedEmail);
    }
}, []);

const handleEmailChange = (e) => {
    const email = e.target.value;
    console.log('Email changed:', email);
    setForgetPasswordEmail(email);
    localStorage.setItem("forgetPasswordEmail", email);
};

  
  

  const moveToNext = (e, index) => {
    let newCode = [...verificationCode];
    const inputValue = e.target.value;
  
    // Handle only numeric input
    if (/^\d$/.test(inputValue)) {
      newCode[index] = inputValue;
      setVerificationCode(newCode.join(''));
      if (index < 3 && inputValue) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (inputValue === "") {
      newCode[index] = "";
      setVerificationCode(newCode.join(''));
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };
  console.log("ForgetPasswordEmail: ", forgetPasswordEmail);

  return (
    <div className="login-page">
      <div className="form-container">
        <form id="loginForm" onSubmit={handleSignIn}>
          <h2>Welcome back, Sign in!</h2>
          <div className="lablebottom">
            <label htmlFor="loginEmail" id="lablemargin">Email</label>
            <input
              type="email"
              id="loginEmail"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              required
            />
          </div>

          <div className="fieldanimation">
            <label htmlFor="loginPassword" id="lablemargin">Password</label>
            <input
              type="password"
              id="loginPassword"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
            />
          </div>

          <div className="rememerandforgot">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="fpcolor">
              <p onClick={showForgetPassword}>Forgot password?</p>
            </div>
          </div>

          <div className="loginsub-animation">
            <button className="login-button" type="submit">Log in</button>
          </div>

          <div className="or-separator">
            <div className="or-line"></div>
            <p className="or-text">Or</p>
            <div className="or-line"></div>
          </div>

          <div>
            <button id="loginWithGoogle" type="button">
              <img src={googlelogo} alt="Google Logo" className="google-logo" />
              <span className="button-text">Log in with Google</span>
            </button>
          </div>

          <div className="dhave-animation">
            <p className="dhaccount">
              Don't have an account? <Link to="/SignUp" id="showSignupFormLink">Sign Up Here!</Link>
            </p>
          </div>
        </form>
      </div>

      {isForgotPassword && (
        <div className="popup">
          <div className="popup-content">
            <h2>Enter your email</h2>
            <span >We'll send you a verification code to reset your password.</span>

            <input
              type="email"
              value={forgetPasswordEmail}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
            <button onClick={handleForgetPassword}>Send Verification Code</button>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Moved OTP verification popup here */}
      {isVerifyCode && (
  <div className="popup">
    <div className="popup-content">
      <div className="otp-container">
        <h2>OTP Verification</h2>
        <h3>Enter the OTP you received on</h3>
        <span className="mobile-number">{forgetPasswordEmail}</span> {/* Display email here */}
        <div className="otp-input-container">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className="otp-input"
              maxLength="1"
              onInput={(e) => moveToNext(e, index)}
            />
          ))}
        </div>
        <button onClick={handleVerifyCode}>Verify Code</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  </div>
)}


      {isResetPassword && (
        <div className="popup">
          <div className="popup-content">
            <h2>Reset Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button onClick={handleNewPassword}>Reset Password</button>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
