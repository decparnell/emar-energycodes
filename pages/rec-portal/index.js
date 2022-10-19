import Calendar from "../../components/calendar/calendar";
import styles from "../../styles/recportal.module.css";
import LinkTextFromDefinitions from "../../components/helperFunctions/linkTextFromDefinitions";
const recPortalLinks = [
  {
    name: "REC Documents",
    link: "https://recportal.co.uk/rec-documents-public-",
    group: "rec_info",
  },
  {
    name: "REC News",
    link: "https://recportal.co.uk/rec-news",
    group: "rec_info",
  },
  {
    name: "User Guide & Operational Doccumets",
    link: "https://recportal.co.uk/category-3-products",
    group: "rec_info",
  },
  {
    name: "FAQs for Customers",
    link: "https://recportal.co.uk/documents/20121/12364247/FAQs+for+Consumers.pdf/7a53c14d-076c-9542-3938-16d0aa23101a?t=1636024847732",
    group: "rec_info",
  },
  {
    name: "Smart Meter Installation Schedule (SMIS)",
    link: "https://recportal.co.uk/smicop",
    group: "rec_info",
  },
  {
    name: "Central Switching Service Development Portal",
    link: "https://devportal.centralswitchingservice.co.uk/signin?ReturnUrl=%2F",
    group: "rec_services",
  },
  {
    name: "Electricity Enquiry Service",
    link: "https://www.ecoes.co.uk/",
    group: "rec_services",
  },
  {
    name: "Green Deal Central Charge Database",
    link: "https://www.gdccportal.com/Pages/Account/Login.aspx",
    group: "rec_services",
  },
];

const definitions = [
  {
    linkText: "REC Board Member",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "REC Board",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
];

function RecPortal() {
  const recinformation = recPortalLinks.filter(
    (link) => link.group == "rec_info"
  );
  const recservices = recPortalLinks.filter(
    (link) => link.group == "rec_services"
  );
  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <Calendar />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.informationTitle}>REC Information</h3>
        <ul>
          {recinformation.map((link, index) => (
            <li key={index}>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.infoContainer}>
        <h3 className={styles.informationTitle}>Access to REC Services</h3>
        <ul>
          {recservices.map((link, index) => (
            <li key={index}>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.dectest}>
        {LinkTextFromDefinitions(
          "Each REC Board Member shall retire 2 years after his or her appointment (plus or minus up to 2 months, as determined by the REC Board at the time of their appointment). A retiring REC Board Member may be re-appointed in accordance with Clause 5.9.",
          definitions
        )}
      </div>
    </div>
  );
}

export default RecPortal;
