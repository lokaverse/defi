import React, { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ConfigProvider } from "antd";

// import OpenLogin from "@toruslabs/openlogin";

// import {
//   lokaMinerAgentCreation,
//   ckBTCAgentCreation,
// } from "../service/canister";

import smallIcon from "../assets/icon/favico_loka.png";

export const AppContext = createContext({});

// const openLoginConfig = {
//   clientId: process.env.REACT_APP_OPEN_LOGIN_CLIENT_ID,
//   network: process.env.REACT_APP_OPEN_LOGIN_NETWORK,
//   uxMode: "popup",
// };

const themeProvider = {
  token: {
    colorPalette1: "#ECA400", // orange
    colorPalette2: "#134E48", // green
    colorPalette3: "#FFFB07", // yellow
    fontFamily: "Inter",
    Button: {
      colorPrimary:
        "linear-gradient(88.85deg, #043153 -9.61%, #E09B00 116.77%)",
      // colorPrimary:
      //   "linear-gradient(47deg, rgba(4,49,83,1) 18%, rgba(224,155,0,1) 76%)",
      fontWeight: 600,
      primaryColor: "white",
      border: "border: 1px solid #043153",
      borderColorDisabled: "border: 1px solid #043153",
    },
  },
  components: {
    Layout: {
      headerBg: "transparent",
      siderBg: "#152233",
    },
    Menu: {
      darkItemBg: "transparent",
      itemSelectedColor: "red",
    },
    Radio: {
      buttonSolidCheckedBg: "#79d5c6",
      buttonSolidCheckedActiveBg: "#79d5c6",
      buttonSolidCheckedHoverBg: "#79d5c6",
    },
    Tabs: {
      itemSelectedColor: "#134E48",
      inkBarColor: "#134E48",
      itemHoverColor: "#134E48",
      itemColor: "#134E48",
    },
  },
};

export const AppProvider = ({ children }) => {
  const [openlogin, setSdk] = useState();
  const [lokaMinerAgent, setLokaMinerAgent] = useState();
  const [ckBTCAgent, setCkBTCAgent] = useState();

  //   useEffect(() => {
  //     async function initializeOpenlogin() {
  //       const sdkInstance = new OpenLogin(openLoginConfig);
  //       await sdkInstance.init();
  //       setSdk(sdkInstance);
  //       if (sdkInstance?.privKey) {
  //         const minerAgent = lokaMinerAgentCreation(sdkInstance.privKey);
  //         const ckbtcAgent = ckBTCAgentCreation(sdkInstance.privKey);
  //         setLokaMinerAgent(minerAgent);
  //         setCkBTCAgent(ckbtcAgent);
  //       }
  //     }
  //     initializeOpenlogin();
  //   }, []);

  return (
    <AppContext.Provider
      value={{
        loginInstance: openlogin,
        lokaMinerAgent,
        setLokaMinerAgent,
        ckBTCAgent,
        setCkBTCAgent,
      }}
    >
      <Helmet>
        <title>Loka — Retail investors get BTC lower than market price</title>
        <link rel="icon" type="png" href={smallIcon} />
        <link rel="apple-touch-icon" type="png" href={smallIcon} />
      </Helmet>
      <ConfigProvider theme={themeProvider}>{children}</ConfigProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
