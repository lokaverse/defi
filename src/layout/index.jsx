import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, theme, Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import BottomNavigation from "./components/BottomNavigation";

import LokaLogo from "../assets/image/loka_logo.png";

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
                defaultSelectedKeys={["stake"]}
                items={menuItem}
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
                onSelect={({ key }) => navigate(`/${key}`)}
              />
            </Col>
          )}
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
          <Outlet />
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
