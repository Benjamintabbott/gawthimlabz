import React from "react";
import ReactDOM from "react-dom/client";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import App from "./App.jsx";
import GlobalStyle from "./GlobalStyle.jsx";
import { ThemeProvider } from 'styled-components';
import theme from './theme.jsx'; // Adjust the path based on your file structure


const opnInWallets = ["Petra"];

const dappConfig = {
  aptosConnect: {
    dappName: "GAWTHIM LABZ",

  },
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <AptosWalletAdapterProvider
    dappInfo={dappConfig}
    autoConnect
    optInWallets={opnInWallets}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </AptosWalletAdapterProvider>,

);