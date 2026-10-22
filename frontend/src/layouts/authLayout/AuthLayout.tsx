import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./authLayout.css";
import Brand from "../../components/brand/Brand";

const AuthLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="auth-layout-main">
        <div className="auth-layout-container">
          <div className="auth-layout-sidebar">
            <div className="auth-layout-sidebar-content">
              <Brand />
              <h1 className="auth-layout-sidebar-title">Accedi o registrati alla biblioteca digitale.</h1>
              <p className="auth-layout-sidebar-text">
                Esplora un universo infinito di libri, saggi e documenti a
                portata di click.
              </p>
            </div>
          </div>
          <div className="auth-layout-content">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
