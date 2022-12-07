import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/newsBanner.module.css";
import AppContext from "../context/AppContext";

export const NewsBanner = (props) => {
  //gets the prop object and put the "news" key into the newsBannerData variable
  const newsBannerData = props.news;

  let [currentIndex, setCurrentIndex] = useState(0);

  //checks newsBannerData items and filters active ones
  const activeNewsItems = newsBannerData.filter(
    (eachItem) => eachItem.active === true
  );
  //gets the AppContext from context and put it in value variable
  const value = useContext(AppContext);
  let { latestNews } = value.state;

  useEffect(() => {
    //loops through activeNewsItems and shows every items fr 5 seconds
    const intervalId = setInterval(() => {
      if (currentIndex === activeNewsItems.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((currentIndex) => currentIndex + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, activeNewsItems.length]);

  return (
    <>
      {/* checks activeNewsItems has any item t display*/}
      {activeNewsItems.length > 0 ? (
        <div className={styles.newsBannerContainer}>
          <h3 className={styles.titleHolder}>
            {`${activeNewsItems[currentIndex].heading} -`}
          </h3>
          &nbsp;
          <span> {`${activeNewsItems[currentIndex].details}`}</span>
        </div>
      ) : null}
    </>
  );
};
