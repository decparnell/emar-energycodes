import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BiChevronLeftCircle,
  BiChevronRightCircle,
  BiRightArrow,
} from "react-icons/bi";
import styles from "../../styles/changeRequestStages.module.css";

function ChangeRequestStages(props) {
  // JSON file retrived from the Change Proposal Register file
  const processStageData = props.processStageData;

  const processStageList = [
    ...new Set(processStageData.map((item) => item["Current Process Stage"])),
  ];

  const [currentProcessStg, setCurrentProcessStg] = useState(() => {
    return processStageList[0];
  });

  const [currentProcessStgItems, setCurrentProcessStgItems] = useState(() => {
    return processStageData.filter(
      (item) => item["Current Process Stage"] === currentProcessStg
    );
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickLeft = () => {
    // Update previous stage
    if (currentIndex > 0) {
      setCurrentIndex((preValue) => preValue - 1);
    }
  };

  const handleClickRight = () => {
    // Update next stage
    if (currentIndex < processStageList.length - 1) {
      setCurrentIndex((preValue) => preValue + 1);
    }
  };

  useEffect(() => {
    setCurrentProcessStg(processStageList[currentIndex]);
    const updatedProcessStgItems = processStageData.filter(
      (item) => item["Current Process Stage"] === currentProcessStg
    );
    setCurrentProcessStgItems(updatedProcessStgItems);
  }, [currentProcessStg, currentIndex]);

  //Left and Right Icons
  const leftBtnIcon = (
    <span
      onClick={handleClickLeft}
      className={styles.leftBtn}
      disabled={currentIndex <= 0}
    >
      <BiChevronLeftCircle
        style={{ color: currentIndex <= 0 ? "gray" : "green" }}
      />
    </span>
  );

  const rightBtnIcon = (
    <span
      onClick={handleClickRight}
      className={styles.rightBtn}
      disabled={currentIndex >= processStageList.length - 1}
    >
      <BiChevronRightCircle
        style={{
          color: currentIndex >= processStageList.length - 1 ? "gray" : "green",
        }}
      />
    </span>
  );

  return (
    <div>
      <div className={styles.changeRqstNavigator}>
        {leftBtnIcon}
        <h6>{currentProcessStg}</h6>
        {rightBtnIcon}
      </div>
      <div className={styles.changeRqstList}>
        {currentProcessStgItems.map((name, index) => (
          <a
            key={index}
            href={name["Link to CP page"]}
            target="_blank"
            rel="noreferrer"
          >
            <BiRightArrow />
            {name["Change Proposal Title"]}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ChangeRequestStages;
