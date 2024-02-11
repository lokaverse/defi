import React from "react";
import { Avatar } from "antd";

import "./style.css";

const mockItem = [
  {
    name: "powckBTC",
    val: "12.004",
    backgroundColor: "#3abde2",
  },
  {
    name: "MPTS",
    val: "0.000576",
    backgroundColor: "#FFD6AE",
  },
  {
    name: "LPTS",
    val: "0.002856",
    backgroundColor: "#A6EF67",
  },
];

const AssetTable = () => {
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
        <div className="loka-apr">
          <div className="apr-background">
            <p>
              LOKA APR <span className="percentage-apr">12%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="asset-table-item-list">
        {mockItem.map((asset) => {
          return (
            <div className="asset-item">
              <div className="asset-name">
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: asset.backgroundColor,
                    color: "#000000",
                    marginRight: "10px",
                  }}
                >
                  {asset.name[0].toUpperCase()}
                </Avatar>
                <span>{asset.name}</span>
              </div>
              <span>{asset.val}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AssetTable;
