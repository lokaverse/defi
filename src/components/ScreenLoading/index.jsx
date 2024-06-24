import React from "react";
import { InfinitySpin } from "react-loader-spinner";

import useGetScreenSize from "../../hooks/useGetScreenSize";

import "./styles.css";

const ScreenLoading = () => {
  const screenHeight = useGetScreenSize();

  return (
    <div className="screen-loading-container" style={{ height: screenHeight }}>
      <InfinitySpin visible={true} color="#ECA400" ariaLabel="loading" />
    </div>
  );
};

export default ScreenLoading;
