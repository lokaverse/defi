import React, { useContext } from "react";

import AssetTable from "../../components/AssetTable";
import StakeCkBTC from "../../components/StakeCkBTC";
import Faq from "../../components/Faq";
import { AppContext } from "../../context";

import "./style.scss";

const Stake = () => {
  const { userBalance } = useContext(AppContext);

  return (
    <main className="stake-container">
      <AssetTable showApr showedAssets={["lokBTC", "MPTS", "LPTS"]} />
      <StakeCkBTC
        ckBTCBalance={userBalance.ckbtc}
        stakedBalance={userBalance.staked}
      />
      <Faq />
    </main>
  );
};

export default Stake;
