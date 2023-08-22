import styles from "../../styles/sideNav.module.css";
import { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

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

  const value = useContext(AppContext);
  let { triggerScrollDown } = value.state;
  const [currentDocSection, setCurrentDocSection] = useState();

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

  //Scroll down
  const scrollToCurrentSection = async () => {
    if (currentDocSection != undefined) {
      const section = document.getElementById(`sec${currentDocSection.sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        //await new Promise((r) => setTimeout(r, 1000));
        value.setTriggerScrollDown(false);
      }
    }
  }

  useEffect(() => {
    if (triggerScrollDown) {
      scrollToCurrentSection();
    }
  }, [triggerScrollDown, currentDocSection]);


  //////DEC _ FIX THIS TO CALL NEW FUNCTION>>> V SLOW TO SCROLL THROUGH SCHEDULES
  const fecthMoreData = async (sectionId) => {

    props.setShouldFetchMoreData(true);

    //await new Promise((r) => setTimeout(r, 1000));
    const section = document.getElementById(`sec${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      await props.fetchData();
    }
  };

  const panelBasedNBHandleClick = async (item, e) => {
    e.preventDefault();

    //trigger change of section and fetch more data
    setCurrentDocSection(item);
    props.stateSet(item);

    const sectionId = item[props.dashboardId];
    const section = document.getElementById(`sec${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }else{
      props.setShouldFetchMoreData(true);
    }
  };

  const LocalNavBar = (props) => {
    return (
      <div className={`${styles.sideNav} box`}>
        {props.items.map((item, i) => (
          <div
            className={`${styles.sideNavItem} ${props.stateVar[props.name] === item[props.name] ? "green" : "blue"
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
    return (
      <div className={`${styles.panelSideNav} box`}>
        {props.items.map((item, i) => (
          <div className={styles.panelBorder} key={`${i}_panelBorder`}>
            <h6 className={styles.panelHeader}>{item[props.panelTitle]}</h6>
            {item[props.dashboardName].map((dashboardItem, id) => (
              <div
                className={`${styles.panelSideNavItem} ${props.stateVar[props.name] === dashboardItem[props.name]
                  ? "green"
                  : ""
                  }`}
                onClick={(e) => panelBasedNBHandleClick(dashboardItem, e)}
                key={`${id}_item`}
              >
                {dashboardItem.sectionOrder !== ""
                  ? dashboardItem.sectionOrder +
                  " - " +
                  dashboardItem[props.name]
                  : dashboardItem[props.name]}
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
            className={`${styles.sideNavItem} ${props.stateVar[props.name] === item[props.name] ? "green" : ""
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
