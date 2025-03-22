import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const Aptrivia = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    { title: "Thrilling Real-Time Battles", description: "Dive into intense real-time competitions and win cash prizes on the spot!" },
    { title: "Daily Challenges", description: "Show up every day for epic games and fresh chances to claim victory!" },
    { title: "Lightning-Fast Payouts", description: "Celebrate your win with instant cash sent straight to you—no waiting!" },
    { title: "Next-Gen Transparency", description: "Powered by the Aptos blockchain, enjoy unmatched transparency game data recorded on Web3!" }

  ];

  return (
    <div
      style={{
        marginLeft: isMobile ? "20px" : "200px",
        marginTop: isMobile ? "100px" : "100px",
        marginRight: isMobile ? "20px" : "100px",
        maxWidth: isMobile ? "calc(100vw - 40px)" : "calc(100vw - 150px)",
        boxSizing: "border-box",
      }}
    >
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: "20px", fontSize: "16px" }}>
        <Link to="/games" style={{ color: "teal", textDecoration: "none" }}>Games</Link> / Aptrivia
      </div>

      {/* Title Section */}
      <h1 style={{ marginBottom: "10px" }}>Aptrivia</h1>
      <h3 style={{ marginBottom: "30px", color: "teal" }}>Free Daily Live Trivia</h3>

      {/* Hero Image */}
      <div
        style={{
          width: "100%",
          height: "40vh",
          backgroundImage: "url('/images/aptrivia-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "25px",
          marginBottom: "30px",
        }}
      ></div>

      {/* Game Description */}
      <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "30px", padding: "20px"}}>
      Welcome to Aptrivia, where the thrill of daily live trivia meets epic rewards! Sharpen
       your mind and dominate the leaderboard in our action-packed trivia games. Compete daily 
      across a variety of topics and snag exciting prizes!

      But that’s not all—NFT holders get exclusive access to our Weekly NFT Trivia Showdowns, where the stakes 
      are higher and the rewards even bigger. Don’t just play—win, learn, and become a trivia legend with Aptrivia!
      </p>

      {/* Game Features */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
        gap: "30px", 
        marginBottom: "75px"
        }}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            style={{ 
              display: "flex", 
              gap: "10px", 
              border: "2px solid white", 
              borderRadius: "25px", 
              padding: "15px",
            }}
          >
              {/* Feature Content */}
              <div style={{padding: "10px"}}>
                <h2 style={{ margin: "0 0 10px 0" }}>{feature.title}</h2>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.5" }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Hero Image */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div
        style={{
          border: "2px solid white", 
          width: isMobile ? "100vw" : "50vw",
          height: isMobile ? "30vh" : "65vh",
          backgroundImage: "url('/images/aptrivia-ecosystem.png')",
          backgroundSize: isMobile ? "contain" : "cover",
          backgroundPosition: "center",
          borderRadius: "25px",
          marginBottom: "30px",
        }}
      ></div>
        </div>
      
    </div>
  );
};

export default Aptrivia;
