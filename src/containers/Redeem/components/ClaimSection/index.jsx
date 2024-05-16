import React, { useContext, useMemo } from "react";

import { AppContext } from "../../../../context";

import ClaimButton from "../../../../components/ClaimButton";

import MPTSIcon from "../../../../assets/icon/mpts-icon.png";
import LPTSIcon from "../../../../assets/icon/lpts-icon.png";

import "./styles.css";

const ClaimSection = () => {
  const { userBalance, getBalanceLoading } = useContext(AppContext);

  const listAsset = useMemo(() => {
    return {
      MPTS: {
        code: "MPTS",
        icon: MPTSIcon,
        balance: 0,
      },
      LPTS: {
        code: "LPTS",
        icon: LPTSIcon,
        balance: 0,
      },
    };
  }, [userBalance]);

  const handleClaim = (id) => {
    console.log(id, "<<<<< id");
  };
  return (
    <div className="claim-secton-container">
      {Object.values(listAsset).map((asset) => {
        return (
          <ClaimButton
            icon={asset.icon}
            name={asset.code}
            value={asset.balance}
            onClaim={() => handleClaim(asset.code)}
          />
        );
      })}
    </div>
  );
};

export default ClaimSection;
