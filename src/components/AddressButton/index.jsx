import React from "react";
import Icon, { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch, Space } from "antd";
import { StakeIcon, ICPIcon } from "../Icons";

import "./style.css";

const AddressButton = () => {
  return (
    <div className="address-button-container">
      <div className="button-container">
        <p>12.004 ckBTC</p>
        {/* <Switch checkedChildren="00fho...BB80DR" defaultChecked /> */}
        <div className="custom-switch">
          <span className="wallet-address">00...80DR</span>
          <div className="icon-container">
            <Icon component={ICPIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressButton;
