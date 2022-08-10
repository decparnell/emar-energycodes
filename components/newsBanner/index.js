import React, { useEffect, useState } from "react";
import styles from "../../styles/newsBanner.module.css";

export const NewsBanner = () => {
  const newsBannerData = [
    {
      id: 1,
      heading: "The POC has been released",
      details: "The Proof of concept will be released in November",
      active: true
    },
    {
      id: 2,
      heading: "Version 4.0.0",
      details: "Version 4.0.0 of the data spec will be released 2023",
      active: true
    },
    {
      id: 3,
      heading: "Old versions update",
      details: "Version 3.0.0 will be out of date soon",
      active: true
    },
    {
      id: 4,
      heading: "This is just a test",
      details: "Version 4.0.0 of the data spec will be released 2023",
      active: false
    }
  ];

  let [currentIndex, setCurrentIndex] = useState(0);
  const activeNewsItems = newsBannerData.filter(
    (eachItem) => eachItem.active === true
  );

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
      ): null}
    </>
  );
};
