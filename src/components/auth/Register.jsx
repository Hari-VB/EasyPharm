import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function registerUser() {
        
        if (!name || !email || !password || !passwordConf) {
            setErrorMessage("All fields are required");
            return;
        }

        if (password !== passwordConf) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password,
        };

        // Store user data in local storage
        try {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const isEmailTaken = existingUsers.some((u) => u.email === email);

            if (isEmailTaken) {
                setErrorMessage("Email is already registered");
                return;
            }

            existingUsers.push(user);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            setErrorMessage('');
            navigate('/login');
        } catch (error) {
            setErrorMessage("Failed to register user");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="register-container" id="mainPage">
                <div className="card register-card">
                    <h2 className="register-title">Register</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={passwordConf}
                            onChange={(event) => setPasswordConf(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn font-weight-bold" id="btn" onClick={registerUser}>
                            Submit
                        </button>
                    </div>
                </div>
                <footer className="footer footer-expand-lg footer-dark footer-transparent fixed-bottom">
                    <div className="container text-center">
                        <p className="mb-0 font-weight-bold">&copy; 2025 EasyPharm. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

export default Register;
