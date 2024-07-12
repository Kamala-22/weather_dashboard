


// Login.jsx
import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';

function Login() {
  const [user] = useAuthState(auth);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setLocalUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      localStorage.setItem('user', JSON.stringify(formData));
      setLocalUser(formData);
      alert('Sign Up Successful!');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        setLocalUser(storedUser);
        alert('Sign In Successful!');
      } else {
        alert('Invalid email or password');
      }
    }
  };

  const handleLogout = () => {
    setLocalUser(null);
    localStorage.removeItem('user');
    auth.signOut();
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="Login">
      {localUser || user ? (
        <div>
          <h1>Welcome, {localUser?.name || user?.displayName}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          </form>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
