import React, { useContext } from "react";
import { Avatar } from "antd";
import { AppContext } from "../../context";
import "./style.css";

const AssetTable = ({ showApr, listAsset }) => {
  const {
    loginInstance,
    setLokaMinerAgent,
    setCkBTCAgent,
    setUserInfo,
    walletPrincipal,
    setLokaDefiAgent,
    setLokBTCAgent,
    setWalletPrincipal,
    lokaDefiAgent,
    ckBTCBalance,
    staked,
    lokBTCBalance,
  } = useContext(AppContext);

  const assets = {
    LOKBTC: {
      name: "LOKBTC",
      val: lokBTCBalance
        ? parseFloat(lokBTCBalance / 10 ** 8)
            .toFixed(5)
            .toLocaleString()
        : "0",
      backgroundColor: "#3abde2",
    },
    MPTS: {
      name: "MPTS",
      val: "0.000xxx",
      backgroundColor: "#FFD6AE",
    },
    LPTS: {
      name: "LPTS",
      val: "0.00xxx",
      backgroundColor: "#A6EF67",
    },
  };
  const getIcon = (asset) => {
    if (asset === "LOKBTC") {
    }

    return;
  };

  return (
    <section className="asset-table-contianer">
      <div className="asset-table-header-section">
        <div className="asset-title">
          <p>My assets</p>
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
        {listAsset.map((asset) => {
          if (!assets[asset]) return null;
          const dataAsset = assets[asset];
          return (
            <div className="asset-item">
              <div className="asset-name">
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: dataAsset.backgroundColor,
                    color: "#000000",
                    marginRight: "10px",
                  }}
                >
                  {dataAsset.name[0].toUpperCase()}
                </Avatar>
                <span>{dataAsset.name}</span>
              </div>
              <span>{dataAsset.val}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AssetTable;
