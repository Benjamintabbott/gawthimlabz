import React from "react";

const WalletButton = ({ isMobile, onClick }) => {
  return (
    <button
      style={{
        padding: isMobile ? "8px 25px" : "10px 50px",
        backgroundColor: "#01fbff",
        color: "black",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: isMobile ? "12px" : "18px",
      }}
      onClick={onClick}
    >
      Sign In
    </button>
  );
};

export default WalletButton;
