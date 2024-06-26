import React, { useState, useMemo, useContext } from "react";
import { Button, Tabs } from "antd";
import Icon from "@ant-design/icons";
import clsx from "clsx";

import { AppContext } from "../../context";

import AssetTable from "../../components/AssetTable";
import { RedeemIcon, ClockCircle, CheckCircle } from "../../components/Icons";

import RequestWithdrawForm from "./components/RequestWithdrawForm";
import WithdrawlClaim from "./components/WithdrawlClaim";
import ClaimSection from "./components/ClaimSection";

import "./style.css";

const Redeem = () => {
  const [activeMenu, setActiveMenu] = useState("withdrawl");

  const withdrawlTabsItem = [
    {
      key: "1",
      label: "Request withdrawal",
      children: <RequestWithdrawForm />,
    },
    {
      key: "2",
      label: "Claim",
      children: <WithdrawlClaim />,
    },
  ];

  return (
    <main className="redeem-container">
      <AssetTable showApr={false} showedAssets={["lokBTC", "MPTS", "LPTS"]} />
      <div className="redeem-header-title">
        <Icon component={RedeemIcon} />
        <p>Redeem</p>
      </div>

      <div className="menu-button-container">
        <Button
          className={clsx("menu-button", {
            isActive: activeMenu === "withdrawl",
          })}
          onClick={() => setActiveMenu("withdrawl")}
        >
          Withdrawal
        </Button>
        <Button
          className={clsx("menu-button", {
            isActive: activeMenu === "claimReward",
          })}
          onClick={() => setActiveMenu("claimReward")}
        >
          Claim Reward
        </Button>
      </div>

      {activeMenu === "withdrawl" && (
        <>
          <div className="withdraws-tabs-container">
            <Tabs
              className="withdraws-tabs"
              defaultActiveKey="1"
              items={withdrawlTabsItem}
            />
          </div>

          <div className="my-request-container">
            <p>My request</p>
            <div className="request-list-container">
              <div className="ready">
                <Icon component={CheckCircle} />
                <p className="title">Ready to claim</p>
                <p className="value">0</p>
              </div>
              <div className="pending">
                <Icon component={ClockCircle} />
                <p className="title">Pending</p>
                <p className="value">0</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeMenu === "claimReward" && <ClaimSection />}
    </main>
  );
};

export default Redeem;
