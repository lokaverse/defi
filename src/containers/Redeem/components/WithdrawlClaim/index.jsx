import React from "react";

import ClaimButton from "../../../../components/ClaimButton";

import MPTSLogo from "../../../../assets/icon/mpts-logo.png";
import PowCKBTC from "../../../../assets/icon/pow-ckbtc-logo.png";

import "./styles.css";

const assets = {
  MPTS: {
    icon: MPTSLogo,
    currency: "MPTS",
    balance: "0.001276",
  },
  LOKBTC: {
    icon: PowCKBTC,
    currency: "LOKBTC",
    balance: "0.000576",
  },
};

const WithdrawlClaim = () => {
  const handleClaim = (id) => {
    console.log(id, "<<<<< id");
  };

  return (
    <div className="withdraw-claim-container">
      {Object.values(assets).map((asset) => {
        return (
          <ClaimButton
            icon={asset.icon}
            name={asset.currency}
            value={asset.balance}
            onClaim={() => handleClaim(asset.currency)}
          />
        );
      })}
    </div>
  );
};

export default WithdrawlClaim;