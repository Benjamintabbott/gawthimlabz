import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomWalletSelector from "./CustomWalletSelector";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1000);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <header
      style={{
        height:"80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#060606",
        color: "var(--text-color)",
        borderBottom: "2px solid #303030",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <img
          src="/images/Gawtham-labz-title.png"
          alt="GAWTHAM LABZ"
          style={{
            height: isMobile ? "40px" : "50px",
            width: "auto",
            transition: "height 0.3s",
          }}
        />
      </Link>

      {/* Wallet Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "gap 0.3s",
        }}
      >
        <CustomWalletSelector />
      </div>
    </header>
  );
};

export default Header;
