import React, { useState, useContext } from "react";
import { Principal } from "@dfinity/principal";
import { Input, Button, message, Skeleton } from "antd";
import Icon from "@ant-design/icons";
import { AppContext } from "../../context";
import { StakeIcon, ICPIcon } from "../Icons";

import "./style.css";

const StakeCkBTC = ({ ckBTCBalance, stakedBalance }) => {
  const { lokaDefiAgent, ckBTCAgent, getUserBalance, getBalanceLoading } =
    useContext(AppContext);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onStaked = async () => {
    // validate input value
    const regex = /^[0-9.]+$/;
    const isValidValue = regex.test(value);

    if (!isValidValue) {
      setError("Amount is not valid !");
      return;
    }

    if (!value || value < "0.0001") {
      setError("Minimum staked amount 0.0001 !");
      return;
    }

    if (!value || value < "0.0001") {
      setError("Minimum staked amount 0.0001 !");
      return;
    }

    setError();
    setLoading(true);

    try {
      const spender_ = {
        owner: Principal.fromText(process.env.REACT_APP_LOKA_DEFI_CANISTER_ID),
        subaccount: [],
      };

      const approve_ = {
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: value * 10 ** 8 + 100,
        expected_allowance: [],
        expires_at: [],
        spender: spender_,
      };

      const approval = await ckBTCAgent.icrc2_approve(approve_);

      if (!approval.Ok) {
        throw new Error("stake approval failed");
      }

      const result = await lokaDefiAgent.addLiquidity(value * 10 ** 8);

      if (!result.success) {
        throw new Error("add liquidity failed");
      }

      setValue();

      // update user balance
      getUserBalance();

      setLoading(false);
    } catch (error) {
      console.log(error, "<<<< error when stake ckbtc");
      message.error("staked failed, please try again later");
      setLoading(false);
      setValue();
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value.toString(); // Ensure the value is at least 100
    setValue(newValue);
  };

  return (
    <section className="stake-ckbtc-container">
      <div className="header-title">
        <Icon component={StakeIcon} />
        <p>Put Liquidity ckBTC</p>
      </div>

      <div className="stake-status">
        <div className="available-amount">
          <p className="title">Balance</p>
          {getBalanceLoading ? (
            <Skeleton.Button active className="amount-skeleton" />
          ) : (
            <p className="value">{`${ckBTCBalance} ckBTC`}</p>
          )}
        </div>
        <div className="staked-amount">
          <p className="title">Staked amount</p>
          {getBalanceLoading ? (
            <Skeleton.Button active className="amount-skeleton" />
          ) : (
            <p className="value">{`${stakedBalance} ckBTC`}</p>
          )}
        </div>
      </div>

      <div className="stake-form-container">
        <Input
          className="stake-amount"
          placeholder="ckBTC amount"
          disabled={loading}
          prefix={<Icon component={ICPIcon} />}
          suffix={
            <Button
              className="stake-amount-max-button"
              onClick={() => {
                setValue(ckBTCBalance);
              }}
              disabled={loading}
            >
              MAX
            </Button>
          }
          value={value}
          onChange={handleInputChange}
        />
        <p className="stake-error-text">{error}</p>

        <Button
          type="primary"
          className="stake-submit-button"
          loading={loading}
          onClick={onStaked}
          disabled={getBalanceLoading}
        >
          Stake
        </Button>

        <div className="stake-receive-information">
          <span>You will receive</span>
          <span>0.0005 lokBTC</span>
        </div>
      </div>
    </section>
  );
};

export default StakeCkBTC;
