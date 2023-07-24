import styles from "../../styles/sideNav.module.css";

function SideNav(props) {
  //props?.navbarType - type of navigation bar
  //Current options:
  // - LocalNavBar : standard local navigation bar
  // - ContentBasedNavBar : hyperlink that jump to specific section
  // - PanelBasedNavBar: Panel based system sections

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

  const panelBasedNBHandleClick = (item, e) => {
    e.preventDefault();
    props.stateSet(item);
    const sectionId = item[props.dashboardId];
    const section = document.getElementById(`sec${sectionId}`);
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

  const PanelBasedNavBar = (props) => {
    console.log("props.items", props.items);
    return (
      <div className={`${styles.panelSideNav} box`}>
        {props.items.map((item, i) => (
          <div className={styles.panelBorder} key={`${i}_panelBorder`}>
            <h6 className={styles.panelHeader}>{item[props.panelTitle]}</h6>
            {item[props.dashboardName].map((dashboardItem, id) => (
              
              <div
                className={`${styles.panelSideNavItem} ${
                  props.stateVar[props.name] === dashboardItem[props.name]
                    ? "green"
                    : ""
                }`}
                onClick={(e) => panelBasedNBHandleClick(dashboardItem, e)}
                key={`${id}_item`}
              >
                
                {dashboardItem.sectionOrder !=="" ?
                  dashboardItem.sectionOrder + " - " + dashboardItem[props.name] :
                  dashboardItem[props.name] }
              </div>
            ))}
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

  const NavigationBar = (props) => {
    switch (props.k) {
      case "ContentBasedNavBar":
        return (
          <ContentBasedNavBar
            items={props.props.items}
            name={props.props.name}
            stateVar={props.props.stateVar}
            stateSet={props.props.stateSet}
            dashboardId={props.props.dashboardId}
          />
        );
      case "PanelBasedNavBar":
        return (
          <PanelBasedNavBar
            items={props.props.items}
            dashboardId={props.props.dashboardId}
            name={props.props.name}
            panelTitle={props.props.panelTitle}
            dashboardName={props.props.dashboardName}
            stateVar={props.props.stateVar}
            stateSet={props.props.stateSet}
          />
        );
      default:
        return (
          <LocalNavBar
            items={props.props.items}
            name={props.props.name}
            stateVar={props.props.stateVar}
            stateSet={props.props.stateSet}
          />
        );
    }
  };

  return <NavigationBar k={props?.navbarType} props={props} />;
}

export default SideNav;
