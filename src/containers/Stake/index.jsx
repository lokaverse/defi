import React from "react";

import AssetTable from "../../components/AssetTable";
import StakeCkBTC from "../../components/StakeCkBTC";
import Faq from "../../components/Faq";

import "./style.css";

const Stake = () => {
  return (
    <main className="stake-container">
      <AssetTable showApr listAsset={["LOKBTC", "MPTS", "LPTS"]} />
      <StakeCkBTC />
      <Faq />
    </main>
  );
};

export default Stake;
