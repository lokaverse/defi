import React, { useState, useContext } from "react";
import { Select, Input, Button } from "antd";

import { AppContext } from "../../../../context";

import "./styles.scss";

const RequestWithdrawForm = () => {
  const { userBalance, getUserBalance, lokaDefiAgent } = useContext(AppContext);
  const [amount, setAmount] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState("lokBTC");

  const assets = {
    lokBTC: {
      currency: "lokBTC",
      balance: userBalance.lokbtc,
    },
    MPTS: {
      currency: "MPTS",
      balance: userBalance.mpts,
    },
    LPTS: {
      currency: "LPTS",
      balance: userBalance.lpts,
    },
  };

  const handleAmountInput = (event) => {
    const newValue = event.target.value.toString(); // Ensure the value is at least 100
    setAmount(newValue);
  };

  const handleSetMax = () => {
    setAmount(assets[selectedAsset].balance);
  };

  const handleWithdraw = async () => {
    // validate input value
    const regex = /^[0-9.]+$/;
    const isValidValue = regex.test(amount);

    if (!isValidValue) {
      setError("Amount is not valid !");
      return;
    }

    if (!amount || amount < "0.0001") {
      setError("Minimum withdraw amount 0.0001 !");
      return;
    }

    if (!amount || amount < "0.0001") {
      setError("Minimum withdraw amount 0.0001 !");
      return;
    }

    setError();
    setLoading(true);
    var result = await lokaDefiAgent.requestRedeem(amount * 1e8);
    console.log(result, "<<<< reeq");
    getUserBalance();
    setLoading(false);
    // mock function
  };

  return (
    <div className="request-withdraw-form-container">
      <div className="selector-container">
        <Select
          className="custom-currency-select request-withdraw-select"
          value={selectedAsset}
          onChange={(val) => {
            setAmount();
            setSelectedAsset(val);
          }}
          options={Object.keys(assets).map((opt) => ({
            value: opt,
            label: opt,
          }))}
          dropdownStyle={{ backgroundColor: "#000000CC", color: "white" }}
        />

        <div className="withdraw-input-section">
          <Input
            className="withdraw-amount"
            value={amount}
            placeholder="Amount"
            onChange={handleAmountInput}
            suffix={
              <Button className="withdraw-max-button" onClick={handleSetMax}>
                MAX
              </Button>
            }
          />
          <p className="withdrwaw-error-text">{error}</p>
        </div>
      </div>

      <Button
        block
        className="withdraw-submit-button"
        loading={loading}
        onClick={handleWithdraw}
      >
        REQUEST WITHDRAWAL
      </Button>

      {selectedAsset === "lokBTC" && (
        <div className="bottom-information">
          <p className="title">Processing time</p>
          <p className="value">24 Hour</p>
        </div>
      )}
    </div>
  );
};

export default RequestWithdrawForm;
