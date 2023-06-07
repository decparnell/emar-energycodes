import AppContext from "../context/AppContext";
import { useContext } from "react";
import styles from "../../styles/header2.module.css";
import { tabs } from "../settings";
import Link from "next/link";
function TabNavbar2() {
  const value = useContext(AppContext);
  let { chosenTab } = value.state;

  const handleClick = (id, e) => {
    //e.preventDefault();
    value.setChosenTab(id);
  };

  return (
    <>
      <div className={`${styles.tabContainer} green`}>
        {tabs.map((item, i) => (
          <Link href={item.link} key={i}>
            <div
              className={styles.tab}
              href="/"
              style={{
                visibility: chosenTab != item.title ? "visible" : "hidden",
              }}
              onClick={(e) => handleClick(item.title, e)}
            >
              {item.title}
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.tabContainerMirror}>
        {tabs.map((item, i) => (
          <Link href={item.link} key={i}>
            <div
              className={`${styles.tabMirror} green`}
              href="/"
              style={{
                visibility: chosenTab === item.title ? "visible" : "hidden",
              }}
            >
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
export default TabNavbar2;
