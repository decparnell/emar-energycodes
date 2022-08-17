import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/newsBanner.module.css";
import AppContext from "../context/AppContext";

export const NewsBanner = (props) => {
  const newsBannerData = props.news

  let [currentIndex, setCurrentIndex] = useState(0);
  const activeNewsItems = newsBannerData.filter(
    (eachItem) => eachItem.active === true
  );
  const value = useContext(AppContext);
  let { latestNews } = value.state;

  useEffect(() => {
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
