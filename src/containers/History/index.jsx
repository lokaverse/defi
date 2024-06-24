import React from "react";
import { Bars } from "react-loader-spinner";

import useGetScreenSize from "../../hooks/useGetScreenSize";

import "./style.css";

const History = () => {
  const screenHeight = useGetScreenSize();

  return (
    <main className="history-container">
      <Bars
        height="40"
        width="40"
        color="#ECA400"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>Coming Soon</p>
    </main>
  );
};

export default History;
