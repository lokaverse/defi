import React from "react";
import { Collapse } from "antd";

import "./style.css";

const FaqList = [
  {
    question: "What is LOKA?",
    answer: `Phasellus blandit purus in est tempor, pulvinar suscipit orci
        luctus. Ut vel porttitor ex. Quisque vel dolor a sem mattis
        aliquam. Donec ullamcorper ligula ut enim elementum, ut
        placerat enim semper. Etiam vehicula est quis sollicitudin
        mattis. Sed gravida tellus eu lorem sodales, sed varius nibh
        aliquet.`,
  },
  {
    question: "How does LOKA work?",
    answer: `Phasellus blandit purus in est tempor, pulvinar suscipit orci
        luctus. Ut vel porttitor ex. Quisque vel dolor a sem mattis
        aliquam. Donec ullamcorper ligula ut enim elementum, ut
        placerat enim semper. Etiam vehicula est quis sollicitudin
        mattis. Sed gravida tellus eu lorem sodales, sed varius nibh
        aliquet.`,
  },
  {
    question: "Is it safe to work with LOKA?",
    answer: `Phasellus blandit purus in est tempor, pulvinar suscipit orci
        luctus. Ut vel porttitor ex. Quisque vel dolor a sem mattis
        aliquam. Donec ullamcorper ligula ut enim elementum, ut
        placerat enim semper. Etiam vehicula est quis sollicitudin
        mattis. Sed gravida tellus eu lorem sodales, sed varius nibh
        aliquet.`,
  },
  {
    question: "What is LOKA staking APR for ICP?",
    answer: `Phasellus blandit purus in est tempor, pulvinar suscipit orci
        luctus. Ut vel porttitor ex. Quisque vel dolor a sem mattis
        aliquam. Donec ullamcorper ligula ut enim elementum, ut
        placerat enim semper. Etiam vehicula est quis sollicitudin
        mattis. Sed gravida tellus eu lorem sodales, sed varius nibh
        aliquet.`,
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
