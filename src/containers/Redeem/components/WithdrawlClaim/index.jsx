import React, { useContext, useMemo, useState } from "react";
import { message } from "antd";
import { AppContext } from "../../../../context";

import ClaimButton from "../../../../components/ClaimButton";

import MPTSIcon from "../../../../assets/icon/mpts-icon.png";
import LOKBTCIcon from "../../../../assets/icon/lokbtc-icon.png";

import "./styles.css";

const WithdrawlClaim = () => {
  const { userBalance, getUserBalance, lokaDefiAgent } = useContext(AppContext);
  const [loading, setLoading] = useState({
    MPTS: false,
    lokBTC: false,
  });

  const listAsset = useMemo(() => {
    return {
      MPTS: {
        code: "MPTS",
        icon: MPTSIcon,
        balance: userBalance.mpts,
      },
      lokBTC: {
        code: "lokBTC",
        icon: LOKBTCIcon,
        balance: userBalance.lokbtc,
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
    getUserBalance();
    setLoading((curr) => ({ ...curr, [currency]: false }));
  };

  return (
    <div className="withdraw-claim-container">
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

export default WithdrawlClaim;
