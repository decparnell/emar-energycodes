import React, { useState } from "react";
import styles from "../../styles/AsideDropDownMenu.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { meniuItems } from "../settings";

function AsideDropDownMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //removing home from the menu items to add it to the list as an icon
  const cleanArray = meniuItems.filter((item) => item.title != "Home");

  return (
    <aside
      className={[
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
        styles.sidebar,
      ].join(" ")}
    >
      <div className={styles.iconContainer}>
        <div
          className={[isSidebarOpen ? styles.open : null, styles.icon].join(
            " "
          )}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.sidebarSectionsList}>
        <ul>
          <li className={styles.listElements} key="homelink">
            <a href="/" className={styles.listElements}>
              <AiOutlineHome className={styles.homeLink} />
            </a>
          </li>
          {cleanArray.map((item, index) => (
            <li className={styles.listElements} key={index}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default AsideDropDownMenu;
