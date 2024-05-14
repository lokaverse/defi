import React, { useState, useContext } from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

import Icon, {
  CheckOutlined,
  CloseOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Switch, message, Button, Modal } from "antd";

import { AppContext } from "../../context";
import { LogoutIcon, ICPIcon } from "../Icons";

import "./style.css";

const AddressButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { loginInstance, setLokaMinerAgent, setCkBTCAgent, setUserInfo } =
    useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    if (!loading) {
      setShowModal(false);
    }
  };

  async function handleLogin() {
    setLoading(true);
    try {
      const { privKey } = await loginInstance.login({
        loginProvider: "google",
        redirectUrl: `${window.origin}`,
      });

      if (!privKey) {
        throw new Error("failed login");
      }

      // const lokaMinerAgent = lokaMinerAgentCreation(privKey);
      // const ckBTCAgent = ckBTCAgentCreation(privKey);

      // setLokaMinerAgent(lokaMinerAgent);
      // setCkBTCAgent(ckBTCAgent);
      setLoading(false);
      setShowModal(false);
      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      setShowModal(false);
      message.error("login failed");
      setIsOpen(false);
    }
  }

  const handleLogout = async () => {
    setLoading(true);
    await loginInstance.logout();
    setLokaMinerAgent();
    setCkBTCAgent();
    // setUserInfo();
    setLoading(false);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="address-button-container">
        {loginInstance && loginInstance.privKey ? (
          <div
            className="button-container"
            style={{
              padding: isMobile ? 8 : 16,
              height: isMobile ? 32 : 48,
              gap: isMobile ? 8 : 16,
            }}
          >
            <p
              className="ckbtc-amount"
              style={{
                fontSize: isMobile ? 8 : 12,
              }}
            >
              12.004 ckBTC
            </p>
            <div
              className="custom-switch"
              style={{
                width: isMobile ? 90 : 126,
                height: isMobile ? 22 : 32,
              }}
            >
              <div className={clsx("top-section", { isOpen })}>
                <p
                  className="wallet-address"
                  style={{
                    fontSize: isMobile ? 8 : 12,
                  }}
                >
                  00...80DR
                </p>
                <div
                  className="icon-container"
                  style={{
                    width: isMobile ? 22 : 32,
                    height: isMobile ? 22 : 32,
                  }}
                  onClick={handleOpen}
                >
                  <Icon component={ICPIcon} />
                </div>
              </div>
              {isOpen && (
                <div
                  className="bottom-section"
                  style={{
                    width: isMobile ? 90 : 126,
                    height: isMobile ? 60 : 70,
                    top: isMobile ? "23px" : "33px",
                  }}
                >
                  <Button
                    type="primary"
                    className="logout-button"
                    style={{
                      fontSize: isMobile ? 8 : 12,
                      height: isMobile ? 20 : 28,
                    }}
                    onClick={() => handleLogout()}
                  >
                    <Icon component={LogoutIcon} />
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button
            className="connect-wallet-button"
            style={{
              fontSize: isMobile ? 10 : 14,
              height: isMobile ? 26 : 32,
            }}
            onClick={() => setShowModal(true)}
          >
            Connect wallet
          </Button>
        )}
      </div>

      <Modal
        centered
        destroyOnClose
        width={392}
        open={showModal}
        closeIcon={<CloseOutlined onClick={() => handleCloseModal()} />}
        footer={false}
        styles={{
          body: {},
          content: {
            borderRadius: "24px",
            padding: "1rem 3rem",
            minHeight: "250px",
          },
        }}
        className="auth-modal"
      >
        <div className="modal-header">
          <p className="title">Sign in</p>
          <p className="subtitle">Your Loka wallet with one click</p>
        </div>
        <div className="modal-content">
          <Button
            shape="round"
            className="modal-button"
            size="large"
            block
            icon={<GoogleOutlined />}
            loading={loading}
            onClick={() => handleLogin()}
          >
            Continue with Google
          </Button>
          <p className="modal-info">
            We do not store any data related to your social logins.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default AddressButton;
