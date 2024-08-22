import React from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "@ant-design/icons";

import {
  StakeIcon,
  SwapIcon,
  RedeemIcon,
  HistoryIcon,
} from "../../../components/Icons";

import "./style.scss";

const menuItem = ["stake", "swap", "redeem", "history"];

const iconMapping = {
  stake: StakeIcon,
  swap: SwapIcon,
  redeem: RedeemIcon,
  history: HistoryIcon,
};

const BottomNavigation = ({ isWalletConnected }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section className="bottom-navigation-container">
      {menuItem.map((item) => {
        return (
          <div
            key={item}
            className={clsx("item", {
              selected: pathname.slice(1) === item,
              disabled: !isWalletConnected,
            })}
            onClick={() => navigate(`/${item}`)}
          >
            <Icon component={iconMapping[item]} />
            <p className="label">{item}</p>
          </div>
        );
      })}
    </section>
  );
};

export default BottomNavigation;
