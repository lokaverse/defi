import React from "react";
import { Collapse } from "antd";

import "./style.scss";

const FaqList = [
  {
    question: "What is LOKA?",
    answer: `Loka is revolutionizing the Bitcoin mining ecosystem by directly connecting investors with Bitcoin miners through a decentralized mining pool and a permissionless forward hashrate marketplace protocol.`,
  },
  {
    question: "How does the Loka Mining Pool work?",
    answer: `Provide liquidity to the Loka decentralized mining pool and earn LP Points (LPTS) via lokBTC, a liquid LP token that is 1:1 redeemable at any time for native Bitcoin.`,
  },
  {
    question:
      "What advantages do Bitcoin miners get from using the Loka mining pool?",
    answer: `Miners receive the highest payout in the market and earn Miner Points (MPTS) based on their hashrate contribution. They will also be able to sell their future mining rewards for upfront revenue in the forward hashrate marketplace.`,
  },
];

const Faq = () => {
  return (
    <section className="faq-container">
      <div className="header-title">
        <p>FAQ</p>
      </div>

      <div className="faq-list">
        {FaqList.map((faq, idx) => {
          return (
            <Collapse
              size="large"
              className="faq-collapse"
              expandIconPosition="end"
              items={[
                {
                  key: idx,
                  label: faq.question,
                  children: <p>{faq.answer}</p>,
                },
              ]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
