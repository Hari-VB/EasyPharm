import React from "react";
import Navbar from "./components/Navbar";
import { NavLink,useNavigate } from "react-router-dom";

function App() {
  return (
    <div id="mainPage">
      <Navbar />
      <header
        className="main-header d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <h1 className="display-4 font-weight-bold">Welcome to EasyPharm</h1>
          <p className="lead font-weight-bold pr">
            The ultimate solution for medical store management. Add Medicines, Manage inventory, and Streamline Operations with ease.
          </p>
          <NavLink to={"/register"}><button className="btn1 font-weight-bold"> Get Started</button></NavLink>
           
          
        </div>
      </header>

      <footer className="footer footer-expand-lg footer-dark footer-transparent fixed-bottom">
        <div className="container text-center">
          <p className="mb-0 font-weight-bold">
            &copy; 2025 EasyPharm. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Adding styles */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          height: 100%;
        }

        .main-header {
          color: white;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.98);
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1.2rem;
          animation: fadeIn 1.5s ease-in-out;
        }

        .pr {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          animation: fadeIn 1.5s ease-in-out;
          
        }

        .btn1 {
          background: #00796b;
          border: none;
          color: white;
          cursor:pointer;
          padding: 10px 20px;
          font-size: 1.1rem;
          border-radius: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          animation: fadeIn 1.5s ease-in-out;

        }
          .btn1:hover{
          background: #005f56;
          }
          
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

export default App;
