export const listItemsToIgnore = ["listNumberItem", "listBulletItem"];

export const listHeaders = ["listNumber", "listBullet"];

export const buttonHeaderOptions = [
  { id: 1, name: "Dashboard" },
  { id: 2, name: "Detailed Search" },
];

export const meniuItems = [
  { title: "Home", link: "/" },
  {
    title: "IBM Jazz",
    link: "https://emar.energycodes.co.uk/rm/web#action=com.ibm.rdm.web.pages.showFoundationProjectDashboard&componentURI=https%3A%2F%2Femar.energycodes.co.uk%2Frm%2Frm-projects%2F_Xqe2IFBPEeuGWeSXvTEFcQ%2Fcomponents%2F_XwleIFBPEeuGWeSXvTEFcQ",
  },
  { title: "Codes Road Map", link: "/codes-road-map" },
];

export const tabs = [
  { title: "Schedules", link: "/" },
  { title: "Data Specification", link: "/dataspec" },
  { title: "Codes Road Map", link: "/codes-road-map" },
  { title: "Release Management", link: "/release-management" },
  {title: "NLP", link: "/nlp" },
];

export const dashboards = [
  {
    dashboardId: 1,
    dashboardName: "Codes Schedules",
    dashboardColumns: 2,
    dashboardOrder: 1,
  },
  {
    dashboardId: 2,
    dashboardName: "Data Specification",
    dashboardColumns: 2,
    dashboardOrder: 2,
  },
];

export const dataSpecSerachTypes = [
  { name: "Market Messages" },
  { name: "Scenario Variants" },
  { name: "Data Items" },
];

export const marketMessageHeaders = [
  { title: "Identifier", dataColumn: "EnergyMarketMessageIdentifier" },
  { title: "Local Reference", dataColumn: "LegacyIdentifier" },
  { title: "Message Name", dataColumn: "Label" },
];

export const scenarioVariantHeaders = [
  {
    title: "Identifier",
    dataColumn: "EnergyMarketMessageScenarioVariantIdentifier",
  },
  {
    title: "Scenario Variant Name",
    dataColumn: "EnergyMarketMessageScenarioVariantName",
  },
  { title: "Source", dataColumn: "SourceName" },
  { title: "Target", dataColumn: "TargetName" },
  { title: "Api Method", dataColumn: "ApiMethod" },
  { title: "Api Route", dataColumn: "ApiRoute" },
];

export const dataItemHeaders = [
  { title: "Identifier", dataColumn: "DataItemIdentifier" },
  { title: "Local Reference", dataColumn: "LegacyIdentifier" },
  { title: "Message Name", dataColumn: "DataItemName" },
];
