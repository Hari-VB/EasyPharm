import React from "react";
import Navbar from "./Navbar";

function Aboutus() {
  return (
    <div className="aboutus-container" id="mainPage">
      <Navbar />
      <div className="card">
        <h1 className="title">What is EasyPharm?</h1>
        <div className="text-section">
          <p>
            EasyPharm is a consumer healthcare “super app” that provides
            consumers with on-demand, home-delivered access to a wide range of
            prescription and OTC pharmaceutical products, other consumer
            healthcare essentials, comprehensive diagnostic test services, and
            teleconsultations—serving all their healthcare needs in one place.
          </p>
          <p>
            Welcome to EasyPharm! We are dedicated to providing high-quality
            pharmaceutical products and exceptional customer service. Our
            mission is to enhance health and well-being by delivering reliable
            solutions to our customers.
          </p>
          <p>
            At EasyPharm, we value trust, integrity, and innovation. Our team
            works tirelessly to ensure that your experience with us is smooth
            and hassle-free. Thank you for choosing EasyPharm for your
            healthcare needs!
          </p>
        </div>
      </div>
      <footer className="footer footer-expand-lg footer-dark footer-transparent fixed-bottom">
        <div className="container text-center">
          <p className="mb-0 font-weight-bold">&copy; 2025 EasyPharm. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Adding styles */}
      <style jsx>{`
        .aboutus-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #e0f7fa, #80deea);
          padding: 20px;
        }
        .card {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 40px 30px;
          max-width: 800px;
          width: 100%;
          text-align: center;
          margin: 20px;
          animation: fadeIn 1.5s ease-in-out;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #00796b;
          font-weight: bold;
        }
        .text-section {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #34495e;
          margin-top: 20px;
        }
        p {
          margin-bottom: 1rem;
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

export default Aboutus;
