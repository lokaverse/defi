import React from "react";

import "./style.css";

const ClaimButton = ({ icon, name, value, onClaim }) => {
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
        <p>{value}</p>
      </div>
      <div onClick={handleClick} className="button-section">
        <p>Claim</p>
      </div>
    </div>
  );
};

export default ClaimButton;
