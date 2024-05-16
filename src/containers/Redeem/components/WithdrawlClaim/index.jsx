import React, { useContext, useMemo } from "react";

import { AppContext } from "../../../../context";

import ClaimButton from "../../../../components/ClaimButton";

import MPTSIcon from "../../../../assets/icon/mpts-icon.png";
import LOKBTCIcon from "../../../../assets/icon/lokbtc-icon.png";

import "./styles.css";

const WithdrawlClaim = () => {
  const { userBalance, getBalanceLoading } = useContext(AppContext);

  const listAsset = useMemo(() => {
    return {
      MPTS: {
        code: "MPTS",
        icon: MPTSIcon,
        balance: 0,
      },
      lokBTC: {
        code: "lokBTC",
        icon: LOKBTCIcon,
        balance: userBalance.lokbtc,
      },
    };
  }, [userBalance]);

  const handleClaim = (id) => {
    console.log(id, "<<<<< id");
  };

  return (
    <div className="withdraw-claim-container">
      {Object.values(listAsset).map((asset) => {
        return (
          <ClaimButton
            icon={asset.icon}
            name={asset.code}
            value={asset.balance}
            onClaim={() => handleClaim(asset.currency)}
          />
        );
      })}
    </div>
  );
};

export default WithdrawlClaim;
