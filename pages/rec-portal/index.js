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
    linkText: "Centralised Registration Service",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Core Systems Assurance Provider",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "CSS Systems Integrator",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Post Implementation Period",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Switching Operator",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "CSS Provider",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },

  {
    linkText: "CRS Provider",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },

  {
    linkText: "DCC Licence",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },

  {
    linkText: "SI Provider",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Party",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "DCC",
    componentText: "dog",
    linkForwardUrl: 1,
    linkType: "definition",
  },

  {
    linkText: "Interpretation Schedule",
    linkType: "schedule",
    componentText: "really",
    linkForwardUrl: 1,
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
          "The DCC is primarily a Party for the purpose of providing the Centralised Registration Service in accordance with Condition 15 (Incorporation, delivery and provision of the Centralised Registration Service) of the DCC Licence, in which context the DCC is referred to as the CRS Provider. The CRS Provider encompasses the following roles: the CSS Provider, the CSS Systems Integrator, the SI Provider and the Switching Operator and, until the end of the Post Implementation Period only, the Core Systems Assurance Provider and CSS Systems Integrator (as such roles are defined in the Interpretation Schedule).",
          definitions
        )}
      </div>
    </div>
  );
}

export default RecPortal;
