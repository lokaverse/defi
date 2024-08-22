import React from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import AddressButton from "../AddressButton";

import GraphImage from "../../assets/image/graph14.png";
import useGetScreenSize from "../../hooks/useGetScreenSize";

import "./styles.scss";

const BlockedScreen = () => {
  const screenHeight = useGetScreenSize();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className="blocked-screen-container"
      style={{ height: screenHeight - 154 }}
    >
      <div className="content">
        <img
          src={GraphImage}
          alt="connect-wallet"
          width={isMobile ? "100%" : "80%"}
        />
        <p className={clsx("hero-text", { isMobile })}>
          STAKE BITCOIN,{" "}
          <span className={clsx({ "new-line": !isMobile })}>
            EARN NATIVE YIELD,{" "}
          </span>
          SPPORT THE NETWORK
        </p>
        <AddressButton walletAddres="" />
      </div>
    </div>
  );
};

export default BlockedScreen;
