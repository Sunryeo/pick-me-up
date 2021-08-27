import React from 'react';
import styles from './MainFeeds.module.css';
import SubNavbar from '../../components/subNavbar/SubNavbar';
import FeedContent from '../../components/feedContent/FeedContent';


const MainFeeds = ({feeds, handleClick}) => {
  return (
  <section className={styles.main}>
    <SubNavbar />
    <ul className={styles.feedList}>
      {feeds.map(el => <FeedContent feed={el} handleSelect={handleClick}/>)}
      {feeds.map(el => <FeedContent feed={el} handleSelect={handleClick}/>)}
      {feeds.map(el => <FeedContent feed={el} handleSelect={handleClick}/>)}
    </ul>
  </section>
  )
};

export default MainFeeds;