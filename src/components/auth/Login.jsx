import { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function generateToken() {
        return btoa(email + ":" + new Date().getTime());
    }

    function attemptLogin() {
        // Check if the email or password fields are empty
        if (!email || !password) {
            setErrorMessage("Please enter both email and password");
            return;
        }

        try {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = existingUsers.find((u) => u.email === email && u.password === password);

            if (user) {
                const token = generateToken();
                const loggedInUser = { ...user, email, token };
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                setErrorMessage('');
                dispatch(setItem(loggedInUser));
                navigate('/medicinepage');
            } else {
                setErrorMessage("Invalid email or password");
            }
        } catch (error) {
            setErrorMessage("An error occurred during login");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="login-container" id="mainPage">
                <div className="card login-card">
                    <h2 className="login-title">Login</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="login-form-group">
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
                        <button className="btn font-weight-bold" id="btn" onClick={attemptLogin}>
                            Login
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

export default Login;
