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

import "./style.css";

const menuItem = ["stake", "swap", "redeem", "history"];

const iconMapping = {
  stake: StakeIcon,
  swap: SwapIcon,
  redeem: RedeemIcon,
  history: HistoryIcon,
};

const BottomNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section className="bottom-navigation-container">
      {menuItem.map((item) => {
        return (
          <div
            key={item}
            className={clsx("bottom-navigation-item", {
              "selected-menu": pathname.slice(1) === item,
            })}
            onClick={() => navigate(`/${item}`)}
          >
            <Icon component={iconMapping[item]} />
            <p className="bottom-navigation-label">{item}</p>
          </div>
        );
      })}
    </section>
  );
};

export default BottomNavigation;
