import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../App";

const Account = () => {
  const { connected, account } = useContext(WalletContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [nftStats, setNftStats] = useState({
    nftsHeld: 0,
    earnedUSDT: 0,
    totalUSDTGiven: 0,
    floorPrice: 0,
  });
  const [gameStats, setGameStats] = useState([]);

  const walletAddress = account?.address;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (connected && walletAddress) {
      fetchNFTStats();
      fetchGameStats();
    }
  }, [connected, walletAddress]);

  const fetchNFTStats = async () => {
    // Simulated API call for NFT stats
    const response = {
      nftsHeld: "N/A",
      earnedUSDT: "N/A",
      totalUSDTGiven: "N/A",
      floorPrice: "N/A", // Example floor price in USDT
    };
    setNftStats(response);
  };

  const fetchGameStats = async () => {
    // Simulated API call for game stats
    const response = [
      {
        gameName: "Aptrivia",
        gamesPlayed: "N/A",
        wins: "N/A",
        avgPlacement: "N/A",
        usdtWon: "N/A",
      },
    ];
    setGameStats(response);
  };

  return (
    <div
      style={{
        margin: isMobile ? "100px 20px" : "100px 200px",
        boxSizing: "border-box",
        maxWidth: "100vw",
      }}
    >
      {/* Title Section */}
      <h1 style={{ marginBottom: "20px" }}>Account Overview</h1>

      {/* NFT Stats Section */}
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "15px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "teal" }}>NFT Stats</h2>
        {!connected ? (
          <p style={{ color: "red" }}>Please connect your wallet to view your NFT stats.</p>
        ) : (
          <div>
            <p>
              <strong>NFTs Held:</strong> {nftStats.nftsHeld}
            </p>
            <p>
              <strong>USDT Earned from NFTs:</strong> ${nftStats.earnedUSDT}
            </p>
            <p>
              <strong>Total USDT Given for NFTs:</strong> ${nftStats.totalUSDTGiven}
            </p>
            <p>
              <strong>Current Floor Price on Wapal:</strong> ${nftStats.floorPrice}
            </p>
          </div>
        )}
      </div>

      {/* Game Stats Section */}
      <div>
        <h2 style={{ marginBottom: "20px", color: "teal" }}>Game Stats</h2>
        {!connected ? (
          <p style={{ color: "red" }}>Please connect your wallet to view your game stats.</p>
        ) : gameStats.length === 0 ? (
          <p>No game statistics available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {gameStats.map((game, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "15px",
            
                }}
              >
                <h3 style={{ marginBottom: "10px", color: "teal" }}>{game.gameName}</h3>
                <p>
                  <strong>Games Played:</strong> {game.gamesPlayed}
                </p>
                <p>
                  <strong>Wins:</strong> {game.wins}
                </p>
                <p>
                  <strong>Average Placement:</strong> {game.avgPlacement}
                </p>
                <p>
                  <strong>USDT Won:</strong> ${game.usdtWon}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
