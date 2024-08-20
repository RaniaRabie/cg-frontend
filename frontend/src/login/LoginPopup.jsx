import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './LoginPopup.css';
import { Link } from 'react-router-dom';
export default function LoginPopup() {
    const [isOpen, setIsOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isSetNewPasswordOpen, setIsSetNewPasswordOpen] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const rules = [
    "capital",
    "match",
    "specialChar",
    "minLength",
    "lowercase",
    "number",
  ];

  const messages = {
    minLength: "The minimum length of the password should be 10.",
    specialChar: "The password should contain at least one special character.",
    number: "The password should contain at least one numeric letter.",
    capital: "The password should contain at least one uppercase letter.",
    match: "Password and password again should match.",
    lowercase: "The password should contain at least one lowercase letter."
  };

  const validatePassword = (password) => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;

    return {
      hasLowerCase: lowerCaseLetters.test(password),
      hasUpperCase: upperCaseLetters.test(password),
      hasNumber: numbers.test(password),
      hasSpecialChar: specialChars.test(password),
      hasLength: password.length >= 10,
    };
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    const validation = validatePassword(password);
    let errorMessage = '';

    if (!validation.hasLength) {
      errorMessage = messages.minLength;
    } else if (!validation.hasUpperCase) {
      errorMessage = messages.capital;
    } else if (!validation.hasLowerCase) {
      errorMessage = messages.lowercase;
    } else if (!validation.hasNumber) {
      errorMessage = messages.number;
    } else if (!validation.hasSpecialChar) {
      errorMessage = messages.specialChar;
    } else if (password !== confirmPassword) {
      errorMessage = messages.match;
    } else {
      errorMessage = '';
    }

    setPasswordError(errorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);

    if (password !== newPassword) {
      setPasswordError(messages.match);
    } else {
      setPasswordError('');
    }
  };

  const handleSetNewPasswordSubmit = (e) => {
    e.preventDefault();

    const validation = validatePassword(newPassword);

    if (!validation.hasLength) {
      setPasswordError(messages.minLength);
    } else if (!validation.hasUpperCase) {
      setPasswordError(messages.capital);
    } else if (!validation.hasLowerCase) {
      setPasswordError(messages.lowercase);
    } else if (!validation.hasNumber) {
      setPasswordError(messages.number);
    } else if (!validation.hasSpecialChar) {
      setPasswordError(messages.specialChar);
    } else if (newPassword !== confirmPassword) {
      setPasswordError(messages.match);
    } else {
      console.log('New password set successfully');
      setIsSetNewPasswordOpen(false); // Close the set new password popup
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(!isForgotPasswordOpen);
  };

  const toggleSetNewPasswordPopup = () => {
    setIsSetNewPasswordOpen(!isSetNewPasswordOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset link sent to:', email);
    setIsForgotPasswordOpen(false);
    setIsSetNewPasswordOpen(true); // Open the set new password popup
  };

  return (
    <div className='L'>
       <button onClick={togglePopup} className="open-popup-button">
        Open Login
      </button>

      {isOpen && !isForgotPasswordOpen && !isSetNewPasswordOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button onClick={togglePopup} className="close-popup-button">
              &times;
            </button>
            <form onSubmit={handleSubmit} className="login-form">
              <h2>Login</h2>
              <div className="form-group">
                <TextField
                  id="email"
                  label="Username or Email"
                  variant="filled"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <div className="form-group">
                <button type="submit">Login</button>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  onClick={toggleForgotPasswordPopup}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="form-group">
                <Link to="/signup" type="button" className="sign-up-link">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}

      {isForgotPasswordOpen && !isSetNewPasswordOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button
              onClick={toggleForgotPasswordPopup}
              className="close-popup-button"
            >
              &times;
            </button>
            <form
              onSubmit={handleForgotPasswordSubmit}
              className="forgot-password-form"
            >
              <h2>Reset Password</h2>
              <div className="form-group">
                <TextField
                  id="reset-email"
                  label="Email"
                  variant="filled"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Send Reset Link</button>
            </form>
          </div>
        </div>
      )}

      {isSetNewPasswordOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button
              onClick={toggleSetNewPasswordPopup}
              className="close-popup-button"
            >
              &times;
            </button>
            <form
              onSubmit={handleSetNewPasswordSubmit}
              className="set-new-password-form"
            >
              <h2>Set New Password</h2>
              <div className="form-group">
                <TextField
                  id="new-password"
                  label="New Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </div>
              <button type="submit" disabled={Boolean(passwordError)}>
                Set New Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
