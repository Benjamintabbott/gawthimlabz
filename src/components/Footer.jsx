import { isMobile } from "@aptos-labs/wallet-adapter-core";
import { React, useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        padding: "10px 20px",
        paddingLeft: isMobile ? "0px" : "150px",
        paddingBottom: isMobile ? "125px" : "0px",
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "1px",
          backgroundColor: "#303030",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img 
          src="/images/Gawtham-labz-title.png"
          alt="Gawthim Labz Title"
          style={{ 
            height: isMobile ? "40px" : "80px", 
            marginRight: "10px",
            paddingLeft: "20px"
          }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/images/aptos-logo.png"
            alt="Aptos Logo"
            style={{ 
              height: isMobile ? "40px" : "75px", 
              marginRight: isMobile ? "5px" : "150px" 
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "10px",
              marginRight: isMobile ? "5px" : "150px",
            }}
          >
            Aptos
          </span>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "1px",
          backgroundColor: "#303030",
        }}
      ></div>
      <p>© 2024 Copyright. Gawthim Labz Inc. All Rights Reserved.</p>
      <div>
        <a
          href="https://github.com/gawthimlabz"
          style={{
            margin: "0 10px",
          }}
        >
          <img
            src="/images/github-logo.png"
            alt="GitHub"
            style={{ 
              height: "50px", 
              marginBottom: "10px", 
              marginTop: "10px", 
              transition: "box-shadow 0.3s", 
              boxShadow: "none" 
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 10px white")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          />
        </a>
        <a
          href="https://medium.com/@gawthimlabz"
          style={{
            margin: "0 10px",
          }}
        >
          <img
            src="/images/medium-logo.png"
            alt="Medium"
            style={{ 
              height: "50px", 
              marginBottom: "10px", 
              marginTop: "10px", 
              transition: "box-shadow 0.3s", 
              boxShadow: "none" 
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 10px white")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          />
        </a>
        <a
          href="https://x.com/gawthimlabz"
          style={{
            margin: "0 10px",
          }}
        >
          <img
            src="/images/x-logo.png"
            alt="X"
            style={{ 
              height: "50px", 
              marginBottom: "10px", 
              marginTop: "10px", 
              transition: "box-shadow 0.3s", 
              boxShadow: "none" 
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 10px white")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          />
        </a>
        <a
          href="mailto:admin@gawthimlabz.com"
          style={{
            margin: "0 10px",
          }}
        >
          <img
            src="/images/mail-logo.png"
            alt="Mail"
            style={{ 
              height: "50px", 
              marginBottom: "10px", 
              marginTop: "10px", 
              transition: "box-shadow 0.3s", 
              boxShadow: "none" 
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 10px white")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
