import React from "react";

import AssetTable from "../../components/AssetTable";
import StakeCkBTC from "../../components/StakeCkBTC";
import Faq from "../../components/Faq";

const Stake = () => {
  return (
    <main className="stake-container">
      <AssetTable />
      <StakeCkBTC />
      <Faq />
    </main>
  );
};

export default Stake;
