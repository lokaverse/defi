import React, { useContext, useMemo, useState } from "react";
import { message } from "antd";
import { AppContext } from "../../../../context";

import ClaimButton from "../../../../components/ClaimButton";

import MPTSIcon from "../../../../assets/icon/mpts-icon.png";
import LPTSIcon from "../../../../assets/icon/lpts-icon.png";

import "./styles.css";

const ClaimSection = () => {
  const { userBalance, lokaDefiAgent, getUserBalance } = useContext(AppContext);
  const [loading, setLoading] = useState({
    MPTS: false,
    lokBTC: false,
  });

  const listAsset = useMemo(() => {
    return {
      MPTS: {
        code: "MPTS",
        icon: MPTSIcon,
        balance: userBalance.claimableMPTS,
      },
      LPTS: {
        code: "LPTS",
        icon: LPTSIcon,
        balance: userBalance.claimableLPTS,
      },
    };
  }, [userBalance]);

  const handleClaim = async (currency) => {
    setLoading((curr) => ({ ...curr, [currency]: true }));
    const claimFunction =
      currency === "MPTS" ? lokaDefiAgent.claimMPTS : lokaDefiAgent.claimLPTS;
    const res = await claimFunction();
    if (res.error) {
      message.error(res.error);
      setLoading((curr) => ({ ...curr, [currency]: false }));
      return;
    }
    setLoading((curr) => ({ ...curr, [currency]: false }));
    getUserBalance();
  };

  return (
    <div className="claim-secton-container">
      {Object.values(listAsset).map((asset) => {
        return (
          <ClaimButton
            icon={asset.icon}
            name={asset.code}
            value={asset.balance}
            isLoading={loading[asset.code]}
            onClaim={() => handleClaim(asset.code)}
          />
        );
      })}
    </div>
  );
};

export default ClaimSection;
