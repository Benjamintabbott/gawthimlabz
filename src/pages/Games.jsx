import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [tableVisible, setTableVisible] = useState(false); // Controls table fade-in

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Trigger table fade-in 1 second after page load
    const tableTimer = setTimeout(() => setTableVisible(true), 1000);
    return () => clearTimeout(tableTimer);
  }, []);

  return (
    <div
      style={{
        margin: isMobile ? "100px 20px 20px 20px" : "100px 100px 100px 200px",
        boxSizing: "border-box",
        maxWidth: "100vw",
      }}
    >
      {/* Title and Description Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "30px",
          opacity: 0,
          animation: "fadeIn 1s forwards",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Games</h1>
        <h2 style={{ marginBottom: "10px", color: "teal" }}>
          On-chain games on the Aptos Network
        </h2>
      </div>

      {/* Columns Section */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? "10px" : "30px",
          flexDirection: isMobile ? "column" : "row",
          maxHeight: isMobile ? "600px" : "400px",
          marginBottom: "30px",
          opacity: 0,
          animation: "fadeIn 1s forwards",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            flex: isMobile ? "1" : "3",
            height: "400px",
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          <img
            src={
              isMobile
                ? "/images/prizes-daily.png"
                : "/images/prizes-daily-desktop.png"
            }
            alt="Live Games"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Column */}
        <div
          style={{
            flex: "1",
            display: isMobile ? "none" : "flex",
            flexDirection: "column",
            gap: "20px",
            height: isMobile ? "600px" : "400px",
          }}
        >
          {/* Top Card */}
          <div
            style={{
              flex: "1",
              color: "white",
              border: "2px solid white",
              borderRadius: "15px",
              padding: "20px",
              display: "block",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Gawthim Labz Games</h2>
            <p>Bringing you on-chain games powered by Aptos blockchain</p>
          </div>

          {/* Bottom Card */}
          <div
            style={{
              flex: "1",
              border: "2px solid white",
              color: "white",
              borderRadius: "15px",
              padding: "20px",
              display: "block",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>NFT Integration</h2>
            <p>Earn passive income and compete in special events.</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "50px",
          }}
        >
          <thead>
            <tr
              style={{
                height: "50px",
                borderBottom: "2px solid gray",
                backgroundColor: "#121212",
                color: "white",
              }}
            >
              <th style={{ padding: "10px", textAlign: "left" }}>#</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              {!isMobile && (
                <th style={{ padding: "10px", textAlign: "left" }}>Genre</th>
              )}
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                name: "APTRIVIA",
                genre: "Trivia",
                status: "Under Development",
                description:
                  "Play daily live trivia and test your knowledge in a fun and rewarding experience.",
                image: "/images/aptrivia-hero.png",
              },
              {
                id: 2,
                name: "More Coming Soon",
                genre: "TBA",
                status: "TBA",
                description: "",
                image: "/images/aptrivia-background.png",
              },
            ].map((row, index) => (
              <tr
                key={row.id}
                onClick={() => navigate(index === 0 ? "/aptrivia" : "/games")}
                style={{
                  height: "100px",
                  borderBottom: "1px solid gray",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "teal";
                  e.currentTarget.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "";
                }}
              >
                <td style={{ padding: "10px" }}>{row.id}</td>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={row.image}
                      alt={row.name}
                      style={{
                        width: isMobile ? "50px" : "75px",
                        height: isMobile ? "50px" : "75px",
                        borderRadius: isMobile ? "10px" : "25px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <strong>{row.name}</strong>
                      {row.description && (
                        <p style={{ margin: "5px 0 0" }}>{row.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                {!isMobile && <td style={{ padding: "10px" }}>{row.genre}</td>}
                <td style={{ padding: "10px" }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInRow {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Games;
