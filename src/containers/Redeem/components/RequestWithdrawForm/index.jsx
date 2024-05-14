import React, { useState } from "react";
import { Select, Input, Button } from "antd";

import "./styles.css";

const assets = {
  powckBTC: {
    currency: "powckBTC",
    balance: "0.001276",
  },
  MPTS: {
    currency: "MPTS",
    balance: "0.000576",
  },
};

const RequestWithdrawForm = () => {
  const [selectedAsset, setSelectedAsset] = useState("powckBTC");

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
          dropdownRender={(menu) => (
            <div className="custom-currency-select-dropdown">{menu}</div>
          )}
        />

        <Input
          className="stake-amount"
          placeholder="ckBTC amount"
          suffix={<Button className="stake-amount-max-button">MAX</Button>}
        />
      </div>

      <Button type="primary" className="stake-submit-button">
        Request withdrawal
      </Button>

      <div className="bottom-information">
        <p className="title">Processing time</p>
        <p className="value">24 Hour</p>
      </div>
    </div>
  );
};

export default RequestWithdrawForm;
