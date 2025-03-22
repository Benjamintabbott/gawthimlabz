import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Games from "./pages/Games";
import NFTs from "./pages/NFTs";
import Events from "./pages/Events";
import Community from "./pages/Community";
import Account from "./pages/Account";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalStyle from "./GlobalStyle";
import Aptrivia from "./pages/Aptrivia";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const {
    connect,
    disconnect,
    connected,
    account,
    connecting,
    signAndSubmitTransaction,
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      if (err?.message?.toLowerCase().includes("user rejected")) {
        console.warn("Wallet connection was rejected by the user.");
      } else {
        console.error("Wallet connection failed:", err.message || err);
        alert("An error occurred while connecting to the wallet. Please try again.");
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Wallet disconnection failed:", err.message || err);
      alert("Failed to disconnect the wallet. Please try again.");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connect: handleConnect,
        disconnect: handleDisconnect,
        connected,
        account,
        connecting,
        signAndSubmitTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const App = () => {
// Specify which wallets to opt in
  const dappInfo = {
    aptosConnect: {
      dappName: "Gawthim Labz", // Your dapp's name
      dappImageURI: "/public/gawthim-labz-logo-trans.png", // Path to dapp's image
    },
  };

  return (
    <Router>
      <GlobalStyle />
      <AptosWalletAdapterProvider dappInfo={dappInfo} autoConnect>
        <WalletProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Sidebar />
              <main style={{ flex: 1, padding: "0px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/nfts" element={<NFTs />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/aptrivia" element={<Aptrivia />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </WalletProvider>
      </AptosWalletAdapterProvider>
    </Router>
  );
};

export default App;
