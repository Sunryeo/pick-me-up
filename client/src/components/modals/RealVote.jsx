import styles from "./RealVote.module.css";
import React, { useState } from "react";

const RealVote = ({ handleVote, setIsVoteReal }) => {
  const clickNo = () => {
    handleVote(false);
  };

  const clickYes = () => {
    handleVote(false);
    setIsVoteReal(true);
  };

  return (
    <section className={styles.backdrop}>
      <div className={styles.realVote}>
        <span className={styles.title}>정말로 투표하시겠습니까?</span>
        <span className={styles.btns}>
          <button className={styles.btn} onClick={clickNo}>
            아니오
          </button>
          <button className={styles.btn} onClick={clickYes}>
            네
          </button>
        </span>
      </div>
    </section>
  );
};

export default RealVote;
