import React from "react";
import AddressButton from "../AddressButton";
import BlockScreenBg from "../../assets/image/block-pattern.png";

import "./styles.css";

const BlockedScreen = () => {
  return (
    <div className="blocked-screen-container">
      <AddressButton walletAddres="" />
    </div>
  );
};

export default BlockedScreen;
