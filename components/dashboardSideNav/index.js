import styles from "../../styles/sideNav.module.css";

function SideNav(props) {
  //props?.navbarType - type of navigation bar
  //Current options:
  // - LocalNavBar : standard local navigation bar
  // - ContentBasedNavBar : hyperlink that jump to specific section

  //Local Navigation Bar
  //props -
  //items = array of items;
  //name = variable containing the name value
  //stateVar = variable to update when a button is clicked
  //stateSet = setting method for the variable

  //Content Based navigation Bar
  //must addittionaly contain
  //dashboardId = variable containing the the identification string to access the dashboardId

  const handleClick = (name, e) => {
    e.preventDefault();
    props.stateSet(name);
  };

  const contentBasedNBHandleClick = (item, e) => {
    e.preventDefault();
    props.stateSet(item);
    const sectionId = item[props.dashboardId];
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const LocalNavBar = (props) => {
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
  };

  const ContentBasedNavBar = (props) => {
    return (
      <div className={`${styles.sideNav} box`}>
        {props.items.map((item, i) => (
          <div
            className={`${styles.sideNavItem} ${
              props.stateVar[props.name] === item[props.name] ? "green" : ""
            }`}
            onClick={(e) => contentBasedNBHandleClick(item, e)}
            key={i}
          >
            {item[props.name]}
          </div>
        ))}
      </div>
    );
  };

  return props?.navbarType === "ContentBasedNavBar" ? (
    <ContentBasedNavBar
      items={props.items}
      name={props.name}
      stateVar={props.stateVar}
      stateSet={props.stateSet}
      dashboardId={props.dashboardId}
    />
  ) : (
    <LocalNavBar
      items={props.items}
      name={props.name}
      stateVar={props.stateVar}
      stateSet={props.stateSet}
    />
  );
}

export default SideNav;
