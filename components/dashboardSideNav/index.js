import styles from "../../styles/sideNav.module.css";
import { useEffect } from "react";
function SideNav(props) {
  //props -
  //items = array of items;
  //name = variable containing the name value
  //stateVar = variable to update when a button is clicked
  //stateSet = setting method for the variable

  const handleClick = (name, e) => {
    e.preventDefault();
    props.stateSet(name);
  };

  return (
    <div className={`${styles.sideNav} box`}>
      {props.items.map((item, i) => (
        <div
          className={`${styles.sideNavItem} ${
            props.stateVar[props.name] === item[props.name] ? "green" : ""
          }`}
          onClick={(e) => handleClick(item, e)}
          key={i}
        >
          {item[props.name]}
        </div>
      ))}
    </div>
  );
}

export default SideNav;
