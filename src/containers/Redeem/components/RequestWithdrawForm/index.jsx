import React, { useState } from "react";
import { Select, Input, Button } from "antd";

import "./styles.css";

const assets = {
  ckBTC: {
    currency: "ckBTC",
    balance: "0.001276",
  },
  MPTS: {
    currency: "MPTS",
    balance: "0.000576",
  },
  LPTS: {
    currency: "LPTS",
    balance: "0.000576",
  },
};

const RequestWithdrawForm = () => {
  const [selectedAsset, setSelectedAsset] = useState("ckBTC");

  return (
    <div className="request-withdraw-form-container">
      <div className="selector-container">
        <Select
          className="request-withdraw-select custom-currency-select"
          value={selectedAsset}
          onChange={(val) => setSelectedAsset(val)}
          options={Object.keys(assets).map((opt) => ({
            value: opt,
            label: opt,
          }))}
          dropdownStyle={{ backgroundColor: "#000000CC", color: "white" }}
        />

        <Input
          className="stake-amount"
          placeholder="amount"
          suffix={<Button className="stake-amount-max-button">MAX</Button>}
        />
      </div>

      <Button type="primary" className="stake-submit-button">
        Request withdrawal
      </Button>

      {selectedAsset === "ckBTC" && (
        <div className="bottom-information">
          <p className="title">Processing time</p>
          <p className="value">24 Hour</p>
        </div>
      )}
    </div>
  );
};

export default RequestWithdrawForm;
