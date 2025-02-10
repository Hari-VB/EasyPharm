import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem } from "../store/authSlice";

function Navbar() {
    // Check localStorage for logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (loggedInUser) {
            localStorage.removeItem("loggedInUser");
            dispatch(removeItem());
            navigate("/login");
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transperent fixed-top">
            <div className="navbar-brand">
                <h2 className="font-weight-bold">EasyPharm</h2>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse mr-auto"
                id="navbarNav"
                style={{ float: "left" }}
            >
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    {/* Always visible links */}
                    <li className="nav-item">
                        <NavLink to={"/"} className="nav-link font-weight-bold ">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/aboutus"} className="nav-link font-weight-bold">
                            About Us
                        </NavLink>
                    </li>

                    {/* Show Log Out link font-weight-bold if user is logged in */}
                    {loggedInUser ? (
                        <li className="nav-item">
                            <span
                                className="nav-link font-weight-bold"
                                onClick={logout}
                                style={{ cursor: "pointer" }}
                            >
                                Log Out
                            </span>
                        </li>
                    ) : (
                        <>
                            {/* Show Login link font-weight-bold if user is not logged in */}
                            <li className="nav-item">
                                <NavLink to={"/login"} className="nav-link font-weight-bold">
                                    Login
                                </NavLink>
                            </li>

                            {/* Show Register link font-weight-bold if user is not logged in */}
                            <li className="nav-item">
                                <NavLink to={"/register"} className="nav-link font-weight-bold">
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
