import React from 'react';
import RealVote from '../modals/RealVote';
import styles from './Vote.module.css';


const Vote = ({feed, handleVote}) => {

  
  return(
  <section className={styles.container}>
 
   <div className={styles.images}>
     <img className={styles.image} src={feed.image_1} alt="option1" onClick={handleVote}/>
     <img className={styles.image} src={feed.image_2} alt="option2" onClick={handleVote}/>
   </div>

   <div className={styles.options}>
     <label className={styles.optionName}>
       <input className={styles.radioBox} name="pick" type="radio" onClick={handleVote}/>{feed.option_1}
     </label>
     <label className={styles.optionName}>
       <input className={styles.radioBox} name="pick" type="radio" onClick={handleVote}/>{feed.option_2}
     </label>
   </div>

 </section>
  );
}

export default Vote;