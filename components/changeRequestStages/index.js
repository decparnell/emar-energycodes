import { useState, useEffect } from "react";
import {
  BiChevronLeftCircle,
  BiChevronRightCircle,
} from "react-icons/bi";
import { CustomBoxLink } from "../customComponents/customBoxLink";
import styles from "../../styles/changeRequestStages.module.css";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
      <div className={styles.help}>
        <Tooltip
          placement="top-start"
          title="Displayed below are the industry changes listed on the REC Portal. They are sorted by current status which can be seen in the title."
        >
          <HelpOutlineIcon className={styles.helpIcon} />
        </Tooltip>
      </div>
      <h4 className={styles.changeRqstTitle}>Industry Changes</h4>
      <div className={`${styles.changeRqstNavigator}`}>
        {leftBtnIcon}
        <p className={styles.changeRqstNavTitle} >{processStageList.length === 0 ? "Data not available" : currentProcessStg}</p>
        {rightBtnIcon}
      </div>
      <div className={styles.changeRqstList}>
        {currentProcessStgItems.map((name, index) => (
          <CustomBoxLink
            href={name["Link to CP page"]}
            key={index}
            target="_blank"
            rel="noreferrer"
          >
            {name["Change Proposal Reference"] + " - " + name["Change Proposal Name"]}
          </CustomBoxLink>
        ))}
      </div>
    </div>
  );
}

export default ChangeRequestStages;
