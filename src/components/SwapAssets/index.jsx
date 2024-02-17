import React from "react";
import { Select } from "antd";

import "./style.css";

const typeTittleMapping = {
  base: "You pay",
  counter: "You receive",
};

const SwapAsset = ({ type, value, asset, swapOption, onSwap }) => {
  return (
    <div className="swap-assets-container">
      <p className="swap-type-title">{typeTittleMapping[type]}</p>
      <div className="swap-section">
        <div className="top">
          <p className="swap-amount">0.0003</p>
          <Select
            className="swap-amoun-select"
            value={value}
            onChange={(val) => onSwap(type, val)}
            options={swapOption.map((opt) => ({ value: opt, label: opt }))}
            dropdownRender={(menu) => (
              <div className="swap-drop-down">{menu}</div>
            )}
          />
        </div>

        <div className="bottom">
          <p>$450.34</p>
          <p>{`Balance: ${asset.balance}`}</p>
        </div>
      </div>
    </div>
  );
};

export default SwapAsset;
