import React from "react";
import { Avatar } from "antd";

import "./style.css";

const assets = {
  powckBTC: {
    name: "powckBTC",
    val: "12.004",
    backgroundColor: "#3abde2",
  },
  MPTS: {
    name: "MPTS",
    val: "0.000576",
    backgroundColor: "#FFD6AE",
  },
  LPTS: {
    name: "LPTS",
    val: "0.002856",
    backgroundColor: "#A6EF67",
  },
};

const AssetTable = ({ showApr, listAsset }) => {
  const getIcon = (asset) => {
    if (asset === "powckBTC") {
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
                LOKA APR <span className="percentage-apr">12%</span>
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
