import React from 'react';
import styles from './Footer.module.css'

const Footer = (props) => {
  return (
  <footer>
    <div className={styles.container}>
      <div className={styles.contentbox}>
      <div className={styles.info}>
        <div className={styles.name}>Pick me up 아직 작업중!!! 
          <li><a>Pickmeup Wiki</a></li>
        </div>
        <div>
          <ul className={styles.name}>Team PickMe
            <li>문순려</li>
            <li>박지영</li>
            <li>유다희</li>
            <li>이동욱</li>
            <li><a>Repo & Wiki</a></li>
          </ul>
        </div>
        <div className={styles.rights}>Copyright &#169; 2021 Team PickMe All rights reserved</div>
      </div>
        
      </div>
    </div>
   
  </footer>
  )
};

export default Footer;
