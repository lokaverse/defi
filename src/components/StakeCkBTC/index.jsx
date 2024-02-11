import React from "react";
import { Input, Button } from "antd";
import Icon, { SearchOutlined } from "@ant-design/icons";
import { StakeIcon, ICPIcon } from "../Icons";

import "./style.css";

const StakeCkBTC = () => {
  return (
    <section className="stake-ckbtc-container">
      <div className="header-title">
        <Icon component={StakeIcon} />
        <p>Stake ckBTC</p>
      </div>

      <div className="stake-status">
        <div className="available-amount">
          <p className="title">Available to stake</p>
          <p className="value">12.004 ckBTC</p>
        </div>
        <div className="staked-amount">
          <p className="title">Staked amount</p>
          <p className="value">0.00256 ckBTC</p>
        </div>
      </div>

      <div className="stake-form-container">
        <Input
          className="stake-amount"
          placeholder="ckBTC amount"
          prefix={<Icon component={ICPIcon} />}
          suffix={<Button className="stake-amount-max-button">MAX</Button>}
        />

        <Button type="primary" className="stake-submit-button">
          Stake
        </Button>

        <div className="stake-receive-information">
          <span>You will receive</span>
          <span>0.0005 powckBTC</span>
        </div>
      </div>
    </section>
  );
};

export default StakeCkBTC;
