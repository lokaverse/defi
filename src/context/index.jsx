import React, { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ConfigProvider } from "antd";

import OpenLogin from "@toruslabs/openlogin";

import {
  lokaDefiAgentCreation,
  ckBTCAgentCreation,
  lokBTCAgentCreation,
  lptsAgentCreation,
  mptsAgentCreation,
} from "../service/canister";

import { normalizeUserBalance } from "../helper/number";
import smallIcon from "../assets/icon/favico_loka.png";

export const AppContext = createContext({});

const openLoginConfig = {
  clientId: process.env.REACT_APP_OPEN_LOGIN_CLIENT_ID,
  network: process.env.REACT_APP_OPEN_LOGIN_NETWORK,
  uxMode: "popup",
};

const themeProvider = {
  token: {
    black: "#3d3c3d",
    grey: "#73888c",
    mediumGrey: "#373d43",
    lightGrey: "#e8e3da",
    darkgrey: "#2c2f33",
    primary: "#f7931a",
    red: "#f74b37",
    green: "#66c61c",
    fontFamily: "PPRadioGrotesk",
    Button: {
      colorPrimary:
        "linear-gradient(88.85deg, #043153 -9.61%, #E09B00 116.77%)",
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
    Select: {
      optionSelectedBg: "rgba(255, 255, 255, 0.2)",
      optionSelectedColor: "white",
    },
  },
};

const defaultUserBalance = {
  ckbtc: 0,
  lokbtc: 0,
  staked: 0,
};

export const AppProvider = ({ children }) => {
  const [openlogin, setSdk] = useState();
  const [ckBTCAgent, setCkBTCAgent] = useState();
  const [lokaDefiAgent, setLokaDefiAgent] = useState();
  const [lokBTCAgent, setLokBTCAgent] = useState();
  const [userBalance, setUserBalance] = useState(defaultUserBalance);
  const [getBalanceLoading, setGetBalanceLoading] = useState(false);
  const [getWithdrawableCKBTC, setWithdrawableCKBTC] = useState(0);
  const [mptsAgent, setMptsAgent] = useState();
  const [lptsAgent, setLptsAgent] = useState();

  const getUserBalance = async () => {
    setGetBalanceLoading(true);
    const userData = await lokaDefiAgent.getUserData();
    // console.log(userData, "<<<<<<< usrd");
    setUserBalance(normalizeUserBalance(userData));
    setGetBalanceLoading(false);
  };

  useEffect(() => {
    async function initializeOpenlogin() {
      const sdkInstance = new OpenLogin(openLoginConfig);
      await sdkInstance.init();
      setSdk(sdkInstance);
      if (sdkInstance?.privKey) {
        const defiAgent = lokaDefiAgentCreation(sdkInstance.privKey);
        const ckbtcAgent = ckBTCAgentCreation(sdkInstance.privKey);
        const lpAgent = lptsAgentCreation(sdkInstance.privKey);
        const mpAgent = mptsAgentCreation(sdkInstance.privKey);
        setLokaDefiAgent(defiAgent);
        setCkBTCAgent(ckbtcAgent);
        setLptsAgent(lpAgent);
        setMptsAgent(mpAgent);
      }
    }
    initializeOpenlogin();
  }, []);

  useEffect(() => {
    if (lokaDefiAgent) {
      getUserBalance();
    }
  }, [lokaDefiAgent]);

  return (
    <AppContext.Provider
      value={{
        loginInstance: openlogin,
        ckBTCAgent,
        setCkBTCAgent,
        lokBTCAgent,
        setLokBTCAgent,
        lokaDefiAgent,
        setLokaDefiAgent,
        userBalance,
        setUserBalance,
        getUserBalance,
        getBalanceLoading,
        lptsAgent,
        mptsAgent,
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
