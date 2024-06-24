import React, { useState, useContext } from "react";
import { Button } from "antd";
import Icon from "@ant-design/icons";

import { AppContext } from "../..//context";

import AssetTable from "../../components/AssetTable";
import SwapAsset from "../../components/SwapAssets";
import { SwapIcon, SwapChange } from "../../components/Icons";

import "./style.css";

const Swap = () => {
  const { userBalance, getUserBalance, lokaDefiAgent } = useContext(AppContext);
  const [base, setBase] = useState("MPTS");
  const [counter, setCounter] = useState("LPTS");

  const assets = {
    MPTS: {
      currency: "MPTS",
      balance: userBalance.mpts,
    },
    LPTS: {
      currency: "LPTS",
      balance: userBalance.lpts,
    },
  };

  const handleSwapChange = (type, val) => {
    if (type === "base") {
      const newCounter = base;
      setBase(val);
      setCounter(newCounter);
    } else {
      const newBase = counter;
      setCounter(val);
      setCounter(newBase);
    }
  };

  const handleSwap = () => {
    const newBase = counter;
    const newCounter = base;
    setBase(newBase);
    setCounter(newCounter);
  };

  return (
    <main className="swap-container">
      <AssetTable showApr={false} showedAssets={["MPTS", "LPTS"]} />
      <div className="swap-header-title">
        <Icon component={SwapIcon} />
        <p>Swap</p>
      </div>
      <SwapAsset
        type={"base"}
        value={base}
        asset={assets[base]}
        swapOption={Object.keys(assets)}
        onSwap={handleSwapChange}
      />

      <div className="swap-change-button-container">
        <Button
          className="swap-change-button"
          icon={<Icon component={SwapChange} />}
          onClick={handleSwap}
        />
      </div>

      <SwapAsset
        type={"counter"}
        value={counter}
        asset={assets[counter]}
        swapOption={Object.keys(assets)}
        onSwap={handleSwapChange}
      />

      <Button type="primary" className="swap-submit-button">
        Swap
      </Button>
    </main>
  );
};

export default Swap;
