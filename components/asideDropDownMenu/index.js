import React, { useState } from "react";
import styles from "../../styles/AsideDropDownMenu.module.css";
import Head from "next/head";
import Link from "next/link";

function AsideDropDownMenu({ meniuItems }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <aside
      className={[
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
        styles.sidebar
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
          {meniuItems.map((item, index) => (
            <a href="/ ">
              <li className={styles.listElements} key={index}>{item}</li>
            </a>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default AsideDropDownMenu;
