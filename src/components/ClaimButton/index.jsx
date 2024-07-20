import React, { useContext } from "react";
import { Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";

import { AppContext } from "../../context";

import "./style.scss";

const ClaimButton = ({ icon, name, value, onClaim, isLoading }) => {
  const { getBalanceLoading } = useContext(AppContext);
  const handleClick = (e) => {
    e.stopPropagation();
    onClaim();
  };
  return (
    <div className="claim-button-container">
      <div className="header-section">
        <img
          className="currency-logo"
          src={icon}
          alt={name}
          width={20}
          height={20}
        />
        <p className="currency-name">{name}</p>
      </div>
      <div className="value-section">
        {getBalanceLoading ? (
          <Skeleton.Button active className="stake-amount-skeleton" />
        ) : (
          <p>{value}</p>
        )}
      </div>
      <div
        onClick={handleClick}
        className={clsx("button-section", { isLoading })}
      >
        {isLoading && <LoadingOutlined />}
        <p>CLAIM</p>
      </div>
    </div>
  );
};

export default ClaimButton;
