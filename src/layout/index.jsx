import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, theme, Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import BottomNavigation from "./components/BottomNavigation";
import AddressButton from "../components/AddressButton";

import LokaLogo from "../assets/image/loka_logo.png";

import "./style.css";

const { Header, Content, Footer } = Layout;

const menuItem = [
  {
    key: "stake",
    label: "Stake",
  },
  {
    key: "swap",
    label: "Swap",
  },
  {
    key: "redeem",
    label: "Redeem",
  },
  {
    key: "history",
    label: "History",
  },
];

const LayoutContainers = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout
      className="main-layout"
      style={{
        minHeight: `${viewportHeight}px`,
        backgroundColor: "#101828",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: !isMobile ? "0 25px" : "0 10px",
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col xs={{ span: 5 }} lg={{ span: 3 }}>
            <div
              className="header-logo-container"
              style={{ justifyContent: "start" }}
            >
              <img
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                src={LokaLogo}
                alt="loka-logo"
                width={isMobile ? "100%" : "75%"}
              />
            </div>
          </Col>

          {!isMobile && (
            <Col md={{ span: 12 }} lg={{ span: 12 }}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[`${pathname.slice(1)}`]}
                items={menuItem}
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
                onSelect={({ key }) => navigate(`/${key}`)}
              />
            </Col>
          )}

          <Col
            xs={{ span: 19 }}
            lg={{ span: 9 }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <AddressButton />
            {/* <div className="header-address-button">
              <AddressButton />
            </div> */}
          </Col>
        </Row>
      </Header>
      <Content>
        <div
          style={{
            background: "transparent",
            padding: 24,
            color: "white",
          }}
        >
          <Row justify={"center"}>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </Content>
      {isMobile && (
        <Footer
          style={{
            position: "sticky",
            bottom: "0",
            padding: "0px",
            backgroundColor: "red",
          }}
        >
          <BottomNavigation />
        </Footer>
      )}
    </Layout>
  );
};
export default LayoutContainers;
