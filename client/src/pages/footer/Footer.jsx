import React from 'react';
import styles from './Footer.module.css'

const Footer = (props) => {
  return (
  <footer>
    <div className={styles.container}>
      <div className={styles.contentbox}>
        <div className={styles.title}>
          TEAM MEMBER
        </div>

        <ul className={styles.info}>
          <li className={styles.name}>
              <span>문순려 [back end] </span>
              <span>이동욱 [back end] </span>
              <span>유다희 [frontend]] </span>
              <span>박지영 [frontend]] </span>
          </li>
        </ul>
      </div>
    </div>
   
  </footer>
  )
};

export default Footer;
