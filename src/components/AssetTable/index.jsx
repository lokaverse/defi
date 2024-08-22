import React, { useContext, useMemo } from "react";

import { LoadingOutlined } from "@ant-design/icons";

import { AppContext } from "../../context";

import MPTSIcon from "../../assets/icon/mpts-icon.png";
import LPTSIcon from "../../assets/icon/lpts-icon.png";
import LOKBTCIcon from "../../assets/icon/lokbtc-icon.png";

import "./style.scss";

const AssetTable = ({ showApr, showedAssets }) => {
  const { userBalance, getBalanceLoading } = useContext(AppContext);

  const listAsset = useMemo(() => {
    return {
      lokBTC: {
        code: "lokBTC",
        icon: LOKBTCIcon,
        balance: userBalance.lokbtc,
      },
      MPTS: {
        code: "MPTS",
        icon: MPTSIcon,
        balance: userBalance.mpts,
      },
      LPTS: {
        code: "LPTS",
        icon: LPTSIcon,
        balance: userBalance.lpts,
      },
    };
  }, [userBalance]);

  return (
    <section className="asset-table-contianer">
      <div className="asset-table-header-section">
        <div className="asset-title">
          <p>MY ASSETS</p>
        </div>
        {showApr && (
          <div className="loka-apr">
            <div className="apr-background">
              <p>
                LOKA APR <span className="percentage-apr">xx%</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="asset-table-item-list">
        {(Object.values(listAsset) || []).map((asset) => {
          if (!showedAssets.includes(asset.code)) return null;
          return (
            <div className="asset-item">
              <div key={asset.code} className="asset-code">
                <img src={asset.icon} alt={asset.code} />
                <span>{asset.code}</span>
              </div>

              {getBalanceLoading ? (
                <LoadingOutlined spin />
              ) : (
                <span>{asset.balance}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AssetTable;
