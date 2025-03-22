import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../App";

const NFTs = () => {
  const { connected, account } = useContext(WalletContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [nfts, setNfts] = useState([]);
  const [rewards, setRewards] = useState({
    nftsHeld: 0,
    earnedUSDT: 0,
    totalRewardsGiven: 0,
  });
  const [selectedNFT, setSelectedNFT] = useState(null);

  const walletAddress = account?.address;
  const INDEXER_API = "https://indexer.mainnet.aptoslabs.com/v1/graphql";

  console.log("Wallet Address:", walletAddress);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNFTsFromIndexer = async () => {
    if (!connected || !walletAddress) {
      console.log("Wallet not connected or address missing");
      return;
    }

    console.log("Fetching NFTs using Aptos Indexer API for:", walletAddress);
    let allNFTs = [];
    let offset = 0;
    const limit = 50; // Number of NFTs per request
    let hasMore = true;

    while (hasMore) {
      const query = `
        query GetAccountNfts($address: String, $limit: Int, $offset: Int) {
          current_token_ownerships_v2(
            where: { owner_address: { _eq: $address }, amount: { _gt: "0" } }
            order_by: { token_data_id: asc }
            limit: $limit
            offset: $offset
          ) {
            token_data_id
            amount
            current_token_data {
              token_name
              token_uri
              largest_property_version_v1
              current_collection {
                collection_name
                collection_id
              }
            }
          }
        }
      `;

      const variables = { address: walletAddress, limit, offset };

      try {
        const response = await fetch(INDEXER_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables }),
        });
        
        const result = await response.json();
        console.log("Full Indexer API Response:", result);
        
        if (!result.data || !result.data.current_token_ownerships_v2) {
          console.error("Unexpected response structure or empty data.");
          break;
        }

        const nftTokens = result.data.current_token_ownerships_v2.filter(token =>
          token.current_token_data?.current_collection?.collection_id ===
          "0x7b4cd01cc85280139fbf2a11dd929a073febeba767d74904d0c691d68b74f321"
        );
        console.log(`Fetched ${nftTokens.length} NFTs in batch from Indexer API.`);
        
        allNFTs = [...allNFTs, ...nftTokens];
        offset += limit;
        hasMore = result.data.current_token_ownerships_v2.length === limit;
      } catch (error) {
        console.error("Failed to fetch NFTs using Aptos Indexer API:", error);
        break;
      }
    }

    console.log("Total NFTs fetched:", allNFTs.length);
    
    const nftsWithMetadata = await Promise.all(
      allNFTs.map(async (nft) => {
        let metadata = {};
        try {
          console.log("Fetching metadata from token_uri for:", nft.current_token_data?.token_uri);
          if (nft.current_token_data?.token_uri) {
            const metadataResponse = await fetch(nft.current_token_data.token_uri);
            metadata = await metadataResponse.json();
            console.log("Metadata Response:", metadata);
          }
        } catch (err) {
          console.error("Failed to fetch metadata for:", nft.current_token_data?.token_uri, err);
        }

        return {
          name: metadata?.name || nft.current_token_data?.token_name || "Unknown NFT",
          image: metadata?.image || "",
          attributes: metadata?.attributes || [],
          rarity: metadata?.rarity || "Unknown",
          id: nft.token_data_id,
        };
      })
    );

    console.log("Final Processed NFTs with Metadata:", nftsWithMetadata);
    setNfts(nftsWithMetadata);
    console.log("NFTs successfully stored in state:", nftsWithMetadata);

    setRewards({
      nftsHeld: nftsWithMetadata.length || 0,
      earnedUSDT: 0,
      totalRewardsGiven: 0,
    });
  };

  useEffect(() => {
    if (connected && walletAddress) {
      console.log("Wallet is connected, fetching NFTs using Indexer API...");
      fetchNFTsFromIndexer();
    }
  }, [connected, walletAddress]);


  const handleCloseModal = () => setSelectedNFT(null);

  const removeFileExtensions = (value) =>
    typeof value === "string" ? value.replace(/\.(jpg|png)$/i, "") : value;

  return (
    <div
      style={{
        margin: isMobile ? "100px 20px" : "100px 200px",
        boxSizing: "border-box",
        maxWidth: "100vw",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>NFTs</h1>
      {/* Hero Video */}
      <div style={{ width: "100%", marginBottom: "40px" }}>
        <video
          src="/images/promo-vid.mp4"
          autoPlay
          muted
          playsInline
          loop
          style={{
            width: "100%",
            height: isMobile ? "25vh" : "50vh",
            objectFit: "cover",
            borderRadius: "25px",
          }}
        />
      </div>

      {/* Content Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
          gridTemplateAreas: isMobile
            ? `"rewards" "nfts"`
            : `"nfts rewards"`,
          gap: "40px",
        }}
      >
        {/* Rewards Column */}
        <div style={{ gridArea: "rewards", alignSelf: "start", border: "1px solid white", borderRadius: "25px", padding: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Rewards</h2>
          <p style={{ fontSize: "18px" }}>
            <strong>NFTs Held:</strong> {connected ? rewards.nftsHeld : "0"}
          </p>
          <p style={{ fontSize: "18px" }}>
            <strong>Earned:</strong> {connected ? rewards.earnedUSDT : "0"} USDT
          </p>
          <p style={{ fontSize: "18px" }}>
            <strong>Total Rewards Given:</strong> {connected ? rewards.totalRewardsGiven : "0"} USDT
          </p>
        </div>

        {/* NFTs Column */}
        <div style={{ gridArea: "nfts" }}>
          <h2>Your Gawthim Labz NFTs</h2>
          {!connected ? (
            <p style={{ color: "red" }}>Please connect your wallet to view NFTs.</p>
          ) : nfts.length === 0 ? (
            <p style={{ color: "orange" }}>
              Sorry, you do not have any "The Baptmen" NFTs! <br />
              Please visit{" "}
              <a
                href="https://wapal.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "teal", textDecoration: "underline" }}
              >
                Wapal
              </a>{" "}
              to get some!
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Always 2 columns, even on mobile
                gap: "20px",
              }}
            >
              {nfts.map((nft, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedNFT(nft)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid #ddd",
                    borderRadius: "25px",
                    overflow: "hidden",
                    textAlign: "center",
                    backgroundColor: "#121212",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "25px 25px 0 0",
                    }}
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                  <div style={{ padding: "15px" }}>
                    <h4 style={{ fontSize: "20px", margin: "0", color: "#fff" }}>{nft.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedNFT && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "10px",
              padding: "20px",
              maxWidth: isMobile ? "60vw" : "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedNFT.image}
              alt={selectedNFT.name}
              style={{
                maxWidth: "100%",
                maxHeight: "50vh",
                borderRadius: "15px",
              }}
            />
            <h2 style={{ marginTop: "20px" }}>{selectedNFT.name}</h2>
            <div style={{ textAlign: "left", marginTop: "20px" }}>
              {selectedNFT.attributes.length > 0 ? (
                selectedNFT.attributes.map(({ trait_type, value }, index) => (
                  <p key={index} style={{ fontSize: "18px" }}>
                    <strong>{trait_type}:</strong> {removeFileExtensions(value)}
                  </p>
                ))
              ) : (
                <p>No attributes available.</p>
              )}
            </div>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "teal",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTs;
