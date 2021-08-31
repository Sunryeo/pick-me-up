import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainFeeds.module.css';
import SubNavbar from '../../components/subNavbar/SubNavbar';
import FeedContent from '../../components/feedContent/FeedContent';


const MainFeeds = ({feeds, filterHandle, handleClick}) => {
  return (
  <section className={styles.main}>
    <SubNavbar filterHandle={filterHandle}/>
    <ul className={styles.feedList}>
    <Link to="/feed">
      {feeds.map(el => <FeedContent feed={el} handleSelect={handleClick}/>)}
    </Link>
    <Link to="/feed">
      {feeds.map(el => <FeedContent feed={el} handleSelect={handleClick}/>)}
    </Link>
    <Link to="/feed">
      {feeds.map(el => <FeedContent feed={el} handleSelect={handleClick}/>)}
    </Link>
      
    </ul>
  </section>
  )
};

export default MainFeeds;