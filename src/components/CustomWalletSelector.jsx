import React, { useState, useEffect } from "react";
import {
  WalletItem,
  useWallet,
  truncateAddress,
  groupAndSortWallets,
} from "@aptos-labs/wallet-adapter-react";

const CustomWalletSelector = () => {
  const { wallets, connect, connected, account, disconnect } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDisconnectOpen, setIsConfirmDisconnectOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [errorMessage, setErrorMessage] = useState("");

  const { aptosConnectWallets, availableWallets } = groupAndSortWallets(wallets);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  };

  const openDisconnectModal = () => {
    setIsConfirmDisconnectOpen(true);
    setIsDropdownOpen(false);
  };
  const closeDisconnectModal = () => setIsConfirmDisconnectOpen(false);

  const handleConnect = async (walletName) => {
    if (!walletName) {
      setErrorMessage("Unable to connect. Wallet name is undefined.");
      return;
    }

    try {
      setErrorMessage("");
      await connect(walletName);
    } catch (error) {
      if (error.message?.includes("User has rejected the request")) {
        setErrorMessage("You rejected the connection request. Please try again.");
      } else {
        setErrorMessage("Failed to connect wallet. Please try again.");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account?.address);
    setIsDropdownOpen(false);
    alert("Address copied to clipboard!");
  };

  const openExplorer = () => {
    window.open(`https://aptoscan.com/account/${account?.address}`, "_blank");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const resizeWalletIcons = () => {
      const icons = document.querySelectorAll(".wallet-icon img");
      icons.forEach((icon) => {
        icon.style.width = "32px";
        icon.style.height = "32px";
        icon.style.objectFit = "contain";
      });
    };

    if (isModalOpen) {
      setTimeout(resizeWalletIcons, 0);
    }
  }, [isModalOpen, wallets]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!connected ? (
        <>
          <button
            style={{
              padding: isMobile ? "8px 15px" : "10px 50px",
              width: isMobile ? "100px": "",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: isMobile ? "5px" : "5px",
              cursor: "pointer",
              fontSize: isMobile ? "14px" : "18px",
            }}
            onClick={openModal}
          >
            Sign In
          </button>

          {/* Wallet Modal */}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
              }}
            >
              <div
                style={{
                  backgroundColor: "#121212",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "400px",
                  maxWidth: "90%",
                  textAlign: "center",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                <h2 style={{ color: "#fff", marginBottom: "20px" }}>LOG IN TO YOUR ACCOUNT</h2>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                {/* Social Wallets */}
                {aptosConnectWallets.length > 0 && (
                  <div>
                    <h3 style={{ color: "#fff", marginBottom: "10px" }}>Social Wallets</h3>
                    {aptosConnectWallets.map((wallet) => (
                      <WalletItem wallet={wallet} key={wallet.name}>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            padding: "20px",
                            backgroundColor: "#333",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            margin: "5px 0",
                            width: "100%",
                          }}
                          onClick={() => handleConnect(wallet.name)}
                        >
                          <div className="wallet-icon">
                            <WalletItem.Icon />
                          </div>
                          <WalletItem.Name style={{ fontSize: "20px", fontWeight: "bold" }} />
                        </button>
                      </WalletItem>
                    ))}
                  </div>
                )}

                {/* Available Wallets */}
                {availableWallets.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <h3 style={{ color: "#fff", marginBottom: "10px" }}>Available Wallets</h3>
                    {availableWallets.map((wallet) => (
                      <WalletItem wallet={wallet} key={wallet.name}>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            padding: "20px",
                            backgroundColor: "#444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            margin: "5px 0",
                            width: "100%",
                          }}
                          onClick={() => handleConnect(wallet.name)}
                        >
                          <div className="wallet-icon">
                            <WalletItem.Icon />
                          </div>
                          <WalletItem.Name style={{ fontSize: "20px", fontWeight: "bold" }} />
                        </button>
                      </WalletItem>
                    ))}
                  </div>
                )}

                <button
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              padding: isMobile ? "8px 15px" : "15px 35px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: isMobile ? "12px" : "16px",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {truncateAddress(account?.address)} 
            <span style={{ fontSize: "14px" }}> ▼</span>
          </button>

          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "#121212",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                padding: "10px",
                width: "200px",
                textAlign: "left",
                zIndex: "1001",
              }}
            >
              <button
                style={{
                  background: "none",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={copyToClipboard}
              >
                Copy Address
              </button>
              <button
                style={{
                  background: "none",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={openExplorer}
              >
                Explorer
              </button>
              <button
                style={{
                  background: "none",
                  color: "#dc3545",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={openDisconnectModal}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}

      {isConfirmDisconnectOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#121212",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h2 
              style={{ 
                color: "#fff", 
                marginBottom: "20px", 
                fontSize: isMobile ? "14px" : "16px",
              }}>
              Are you sure you want to disconnect?
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  disconnect();
                  closeDisconnectModal();
                  setIsModalOpen(false);
                }}
              >
                Yes
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={closeDisconnectModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomWalletSelector;
