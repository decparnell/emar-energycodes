export const listItemsToIgnore = ["listNumberItem", "listBulletItem"];

export const listHeaders = ["listNumber", "listBullet"];

export const scheduleInterpretationDefinitions = 2;

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
  { title: "ERIN", link: "/erin_develop" },
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

export const nlpLinkNames = [
  "Main Body",
  "Schedule",
  "CoMCoP",
  "Service Definition",
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
  { title: "Local Reference", dataColumn: "LegacyIdentifier" },
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

export const codeSchdulesHeaders = [
  { title: "Document Name", dataColumn: "documentName" },
  { title: "Clause Reference", dataColumn: "clauseReference" },
  { title: "Clause Text", dataColumn: "componentText" },
];

export const uiVersion = "V3.0.0 - 01/01/24";

export const loadedDocuments = [
  {
    documentType: "Main Body",
    documentTitle: "Main Body",
  },
  {
    documentType: "Schedule 1",
    documentTitle: "Interpretations and Definitions",
  },
  {
    documentType: "Schedule 2",
    documentTitle: "Transition",
  },
  {
    documentType: "Schedule 3",
    documentTitle: "Accession Agreement",
  },
  {
    documentType: "Schedule 4",
    documentTitle: "Company Governance",
  },
  {
    documentType: "Schedule 5",
    documentTitle: "Change Management",
  },
  {
    documentType: "Schedule 6",
    documentTitle: "Performance Assurance",
  },
  {
    documentType: "Schedule 7",
    documentTitle: "Energy Theft Reduction",
  },
  {
    documentType: "Schedule 8",
    documentTitle: "Unbilled Energy Code of Practice",
  },
  {
    documentType: "Schedule 9",
    documentTitle: "Qualification and Maintenance",
  },
  {
    documentType: "Schedule 10",
    documentTitle: "Charging Methodology",
  },
  {
    documentType: "Schedule 11",
    documentTitle: "Prepayment Arrangements",
  },
  {
    documentType: "Schedule 12",
    documentTitle: "Data Access",
  },
  {
    documentType: "Schedule 13",
    documentTitle: "Transfer of Consumer Data",
  },
  {
    documentType: "Schedule 14",
    documentTitle: "Metering Operations",
  },
  {
    documentType: "Schedule 15",
    documentTitle: "Metering Accreditation",
  },
  {
    documentType: "Schedule 17",
    documentTitle: "Secure Data Exchange",
  },
  {
    documentType: "Schedule 18",
    documentTitle: "Green Deal Arrangements",
  },
  {
    documentType: "Schedule 19",
    documentTitle: "Market Exit and Supplier of Last Resort",
  },
  {
    documentType: "Schedule 22",
    documentTitle: "Market Stabilisation Charge",
  },
  {
    documentType: "Schedule 23",
    documentTitle: "Registration Services",
  },
  {
    documentType: "Schedule 24",
    documentTitle: "Switching Data Management",
  },
  {
    documentType: "Schedule 25",
    documentTitle: "Central Switching Service",
  },
  {
    documentType: "Schedule 26",
    documentTitle: "Switching Service Management",
  },
  {
    documentType: "Schedule 27",
    documentTitle: "RMP Lifecycle",
  },
  {
    documentType: "Schedule 28",
    documentTitle: "Related Metering Points",
  },
  {
    documentType: "Schedule 29",
    documentTitle: "Address Management",
  },
  {
    documentType: "Schedule 30",
    documentTitle: "Resolution of Consumer Facing Switching and Billing Issues",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Electricity Enquiry Service Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle:
      "Central Data Service Provider Further Services Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Secure Data Exchange Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Green Deal Central Charging Database Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Gas Enquiry Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Electricity Retail Data Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Gas Retail Data Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Switching Operator Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "Central Switching Service Definition",
  },
  {
    documentType: "Service Specification",
    documentTitle: "CSS Certificate Authority Service Definition",
  },
  {
    documentType: "Metering Code of Practice",
    documentTitle: "Consolidated Metering Code of Practice (CoMCoP)",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Change Panel Terms of Reference",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Performance Assurance Board",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Cross Code Steering Group",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Performance Assurance: Report Catalogue",
  },
  {
    documentType: "REC Baseline Statement",
    documentTitle: "REC Baseline Statement",
  },
  {
    documentType: "Charging Statement",
    documentTitle: "REC Charging Statement",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Technical Expert Panel",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Metering Expert Panel",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Green Deal Panel",
  },
  {
    documentType: "Terms of Reference",
    documentTitle: "Switching Change Advisory Board",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Performance Assurance Board (PAB) Procedures",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Performance Assurance Operating Plan",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Performance Assurance Techniques",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Performance Assurance: Retail Risk Register",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Performance Assurance: Methodology",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Data Cleanse - Active Relationship Report Guidance",
  },
  {
    documentType: "Performance Assurance",
    documentTitle: "Data Cleanse Reports Guidance",
  },
  {
    documentType: "Entry, Qualification and Maintenance",
    documentTitle: "REC Entry Assessment Forms",
  },
  {
    documentType: "Entry, Qualification and Maintenance",
    documentTitle: "Entry Assessment Information Pack",
  },
  {
    documentType: "Entry, Qualification and Maintenance",
    documentTitle: "REC Service User Categorisation",
  },
  {
    documentType: "Testing Specification",
    documentTitle: "REC and BSC Joint Storyboards",
  },
  {
    documentType: "Theft",
    documentTitle: "Electricity Theft Calculator",
  },
  {
    documentType: "Theft",
    documentTitle: "Gas Theft Calculator",
  },
  {
    documentType: "Theft",
    documentTitle: "Electricity Theft Calculator User Guide",
  },
  {
    documentType: "Theft",
    documentTitle: "Gas Theft Calculator User Guide",
  },
  {
    documentType: "Theft",
    documentTitle: "Theft Calculator Technical Guide",
  },
  {
    documentType: "Theft",
    documentTitle: "REC Theft Target Methodology",
  },
  {
    documentType: "Theft",
    documentTitle:
      "Energy Theft Detection Incentive Scheme Reporting Timeframe",
  },
  {
    documentType: "Metering",
    documentTitle: "Electricity Metering Point Guidance",
  },
  {
    documentType: "Metering",
    documentTitle: "Service Termination Issue Reporting Guidance",
  },
  {
    documentType: "Service Management",
    documentTitle: "Electricity Enquiry Service User Guide - Distributor",
  },
  {
    documentType: "Service Management",
    documentTitle:
      "Electricity Enquiry Service User Guide - MEM & Supplier Agent",
  },
  {
    documentType: "Service Management",
    documentTitle: "Electricity Enquiry Service User Guide - Supplier",
  },
  {
    documentType: "Service Management",
    documentTitle: "Electricity Enquiry Service User Guide - Third Party",
  },
  {
    documentType: "Service Management",
    documentTitle: "Electricity Enquiry Service User Guide - TPI",
  },
  {
    documentType: "Service Management",
    documentTitle:
      "Electricity Enquiry Service User Guide - Non-Domestic Customer",
  },
  {
    documentType: "Service Management",
    documentTitle: "Prepayment Meter Key Supplier IDs",
  },
  {
    documentType: "Service Management",
    documentTitle: "Gas Enquiry Service User Guide",
  },
  {
    documentType: "Service Management",
    documentTitle:
      "Gas Enquiry Service Portal User Guide Supplementary Documentation",
  },
  {
    documentType: "Service Management",
    documentTitle: "GDCC User Guide",
  },
  {
    documentType: "Service Management",
    documentTitle: "Secure Data Exchange Portal (SDEP) User Guide",
  },
  {
    documentType: "Service Management",
    documentTitle: "Switching Operator - Incident Management Policy",
  },
  {
    documentType: "Service Management",
    documentTitle: "CSS Security and API Supporting Information",
  },
  {
    documentType: "Service Management",
    documentTitle: "CSS Error Processing Guide",
  },
  {
    documentType: "Service Management",
    documentTitle: "Switching Service Management Procedures",
  },
  {
    documentType: "Service Management",
    documentTitle: "Switching Operational Change Management Procedures",
  },
  {
    documentType: "Service Management",
    documentTitle: "CSS Criteria for Reporting High Demand",
  },
  {
    documentType: "Testing Specification",
    documentTitle: "CSS External Test Testing Scenarios",
  },
  {
    documentType: "Testing Specification",
    documentTitle: "CSS External Testing Guidance",
  },
  {
    documentType: "Address Management",
    documentTitle: "REL Address Guidance",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Data Item Catalogue",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Market Message Catalogue",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Electricity Data Access Matrix",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Gas Data Access Matrix",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Standards Definition",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Supply Number Format",
  },
  {
    documentType: "Data Specification",
    documentTitle:
      "Treatment of remotely retrieved meter readings from SMETS2+ gas meters",
  },
  {
    documentType: "Data Specification",
    documentTitle: "GES Meter Asset Enquiry API Technical Specification",
  },
  {
    documentType: "Data Specification",
    documentTitle: "GES Supply Point Switching API Technical Specification",
  },
  {
    documentType: "Data Specification",
    documentTitle: "GES Supply Point Enquiry API Technical Specification",
  },
  {
    documentType: "Data Specification",
    documentTitle: "CSS Certificate Profile",
  },
  {
    documentType: "Data Specification",
    documentTitle: "EES API Technical Specification",
  },
  {
    documentType: "Data Specification",
    documentTitle: "CSS Message Business Data Validation Rules",
  },
  {
    documentType: "Data Specification",
    documentTitle: "Address Population Rules",
  },
  {
    documentType: "Meter Product Data",
    documentTitle: "Meter Product Data General",
  },
  {
    documentType: "Meter Product Data",
    documentTitle: "Meter Product Table",
  },
  {
    documentType: "Meter Product Data",
    documentTitle: "Meter Product Shadow Log",
  },
  {
    documentType: "Meter Product Data",
    documentTitle: "Converter Product Table",
  },
  {
    documentType: "Meter Product Data",
    documentTitle: "Converter Product Shadow Log",
  },
  {
    documentType: "Live Information",
    documentTitle: "Change & Release Information ",
  },
  {
    documentType: "Live Information",
    documentTitle: "Upcoming Events",
  },
  {
    documentType: "Guides",
    documentTitle: "SNOW Articles",
  },
  {
    documentType: "Guides",
    documentTitle: "Wiki Articles",
  },
];
