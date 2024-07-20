import React from "react";
import { Select, Input, Button } from "antd";

import "./style.scss";

const typeTittleMapping = {
  base: "You pay",
  counter: "You receive",
};

const SwapAsset = ({
  type,
  value,
  asset,
  swapOption,
  onSwap,
  changeInput,
  balance,
  loading,
  amount,
  setAmount,
}) => {
  const validateInput = (event) => {
    var newValue = event.target.value.toString(); // Ensure the value is at least 100
    //console.log(newValue, "<<<<w");
    console.log(asset.balance, "<<<<aw");
    //console.log(type, "<<<<tp");
    if (type == "base" && Number(newValue) > Number(asset.balance))
      newValue = asset.balance;
    setAmount(newValue);
    //console.log(newValue, "<<<<< swapping");
  };
  return (
    <div className="swap-assets-container">
      <p className="swap-type-title">{typeTittleMapping[type]}</p>
      <div className="swap-section">
        <div className="top">
          <Input
            className="swap-amount"
            value={amount}
            onChange={validateInput}
          />
          <Select
            className="swap-asset-select custom-currency-select"
            value={value}
            onChange={(val) => onSwap(type, val)}
            options={swapOption.map((opt) => ({ value: opt, label: opt }))}
            dropdownStyle={{ backgroundColor: "#000000CC", color: "white" }}
          />
        </div>

        <div className="bottom">
          <p>{`$${amount}`}</p>
          <p>{`Balance: ${asset.balance}`}</p>
        </div>
      </div>
    </div>
  );
};

export default SwapAsset;
