import React, { useState, useContext } from "react";
import { Select, Input, Button } from "antd";

import { AppContext } from "../../../../context";

import "./styles.css";

const RequestWithdrawForm = () => {
  const { userBalance, getUserBalance, lokaDefiAgent } = useContext(AppContext);
  const [amount, setAmount] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState("ckBTC");

  const assets = {
    ckBTC: {
      currency: "ckBTC",
      balance: userBalance.ckbtc,
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

    // mock function
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="request-withdraw-form-container">
      <div className="selector-container">
        <Select
          className="request-withdraw-select custom-currency-select"
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
            className="stake-amount"
            value={amount}
            placeholder="amount"
            onChange={handleAmountInput}
            suffix={
              <Button
                className="stake-amount-max-button"
                onClick={handleSetMax}
              >
                MAX
              </Button>
            }
          />
          <p className="withdrwaw-error-text">{error}</p>
        </div>
      </div>

      <Button
        type="primary"
        className="stake-submit-button"
        loading={loading}
        onClick={handleWithdraw}
      >
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
