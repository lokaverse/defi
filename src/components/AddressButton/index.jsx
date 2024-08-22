import React, { useState, useContext } from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message, Button, Modal } from "antd";

import Icon, {
  LoadingOutlined,
  CloseOutlined,
  LogoutOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import {
  lokaDefiAgentCreation,
  ckBTCAgentCreation,
} from "../../service/canister";

import { shortenWalletAddress } from "../../helper/string";

import { AppContext } from "../../context";
import { LogoutIcon, ICPIcon } from "../Icons";

import "./style.scss";

const AddressButton = ({ walletAddres }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {
    loginInstance,
    setCkBTCAgent,
    setLokaDefiAgent,
    setLokBTCAgent,
    userBalance,
    getBalanceLoading,
    setUserBalance,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    message.success("Wallet address copied");
  };

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

      const lokaDefiAgent = lokaDefiAgentCreation(privKey);
      const ckBTCAgent = ckBTCAgentCreation(privKey);
      setLokaDefiAgent(lokaDefiAgent);
      setCkBTCAgent(ckBTCAgent);

      setLoading(false);
      setShowModal(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error, "error handle login");
      setLoading(false);
      setShowModal(false);
      message.error("login failed");
      setIsOpen(false);
    }
  }

  const handleLogout = async () => {
    setLoading(true);
    await loginInstance.logout();
    setCkBTCAgent();
    setLokBTCAgent();
    setLokaDefiAgent();
    setUserBalance({
      ckbtc: 0,
      lokbtc: 0,
      staked: 0,
    });
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
            {getBalanceLoading ? (
              <LoadingOutlined
                spin
                style={{
                  color: "white",
                  fontSize: isMobile ? 8 : 12,
                }}
              />
            ) : (
              <p
                className="ckbtc-amount"
                style={{
                  fontSize: isMobile ? 8 : 12,
                }}
              >
                {`${userBalance.ckbtc} ckBTC`}
              </p>
            )}

            <div
              className="custom-switch"
              style={{
                width: isMobile ? 90 : 126,
                height: isMobile ? 22 : 32,
              }}
            >
              <div className={clsx("top-section", { isOpen })}>
                <CopyToClipboard text={walletAddres} onCopy={handleCopy}>
                  <p
                    className="wallet-address"
                    style={{
                      fontSize: isMobile ? 8 : 12,
                    }}
                  >
                    {shortenWalletAddress(walletAddres)}
                  </p>
                </CopyToClipboard>
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
                    className="logout-button"
                    style={{
                      fontSize: isMobile ? 8 : 12,
                      height: isMobile ? 20 : 28,
                    }}
                    onClick={() => handleLogout()}
                  >
                    Disconnect
                    <LogoutOutlined />
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
