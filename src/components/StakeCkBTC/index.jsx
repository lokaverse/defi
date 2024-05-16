import React, { useState, useContext } from "react";
import { Principal } from "@dfinity/principal";
import { Input, Button } from "antd";
import Icon, { SearchOutlined } from "@ant-design/icons";
import { StakeIcon, ICPIcon } from "../Icons";

import "./style.css";
import { AppContext } from "../../context";
const StakeCkBTC = () => {
  const [value, setValue] = useState(false);
  const {
    loginInstance,
    setLokaMinerAgent,
    setCkBTCAgent,
    setUserInfo,
    walletPrincipal,
    setLokaDefiAgent,
    setLokBTCAgent,
    setWalletPrincipal,
    lokaDefiAgent,
    ckBTCAgent,
    ckBTCBalance,
    staked,
    setCKBTCBalance,
    setStaked,
    setLokBTCBalance,
  } = useContext(AppContext);

  async function handleStake() {
    console.log("staking...");

    var spender_ = {
      owner: Principal.fromText(process.env.REACT_APP_LOKA_DEFI_CANISTER_ID),
      subaccount: [],
    };

    var approve_ = {
      fee: [],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: value * 10 ** 8 + 100,
      expected_allowance: [],
      expires_at: [],
      spender: spender_,
    };

    var approval = await ckBTCAgent.icrc2_approve(approve_);
    console.log(approval, "<<<< approval");

    var result = await lokaDefiAgent.addLiquidity(value * 10 ** 8);
    console.log(result, "<<<< stake result");
    const userData = await lokaDefiAgent.getUserData();
    setCKBTCBalance(Number(userData.ckbtc));
    setLokBTCBalance(Number(userData.lokbtc));
    setStaked(Number(userData.staked));
    console.log(userData, "<<<<<<<<<<<< user data");
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value.toString(); // Ensure the value is at least 100
    //dispatch(changeInvestment(newValue));
    setValue(newValue);
  };
  return (
    <section className="stake-ckbtc-container">
      <div className="header-title">
        <Icon component={StakeIcon} />
        <p>Stake ckBTC</p>
      </div>

      <div className="stake-status">
        <div className="available-amount">
          <p className="title">Available to stake</p>
          <p className="value">
            {ckBTCBalance
              ? parseFloat(ckBTCBalance / 10 ** 8)
                  .toFixed(5)
                  .toLocaleString()
              : "0"}{" "}
            ckBTC
          </p>
        </div>
        <div className="staked-amount">
          <p className="title">Staked amount</p>
          <p className="value">
            {staked
              ? parseFloat(staked / 10 ** 8)
                  .toFixed(5)
                  .toLocaleString()
              : "0"}{" "}
            ckBTC
          </p>
        </div>
      </div>

      <div className="stake-form-container">
        <Input
          className="stake-amount"
          placeholder="ckBTC amount"
          prefix={<Icon component={ICPIcon} />}
          suffix={
            <Button
              className="stake-amount-max-button"
              onClick={() => {
                setValue(ckBTCBalance / 10 ** 8);
              }}
            >
              MAX
            </Button>
          }
          value={value}
          onChange={handleInputChange}
        />

        <Button
          type="primary"
          className="stake-submit-button"
          onClick={async () => {
            handleStake();
          }}
        >
          Stake
        </Button>

        <div className="stake-receive-information">
          <span>You will receive</span>
          <span>0.0005 LOKBTC</span>
        </div>
      </div>
    </section>
  );
};

export default StakeCkBTC;
