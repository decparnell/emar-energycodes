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
  { title: "ERIN", link: "/erin" },
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

export const searchResultsHeaders = [{
  "marketmessage" : [
    { title: "Identifier", dataColumn: "EnergyMarketMessageIdentifier" },
    { title: "Result", dataColumn: "Result" },
    { title: "Source Name", dataColumn: "sourceName" },
  ],
  "dataitems": [
    { title: "Identifier", dataColumn: "DataItemIdentifier" },
    { title: "Result", dataColumn: "Result" },
    { title: "Source Name", dataColumn: "sourceName" },
  ],
  "scenariovariant": [
    { title: "Identifier", dataColumn: "EnergyMarketMessageScenarioVariantIdentifier" },
    { title: "Result", dataColumn: "EnergyMarketMessageScenarioVariantName" },
    { title: "Source Name", dataColumn: "sourceName" },
  ],
  "schedules": [
    { title: "Identifier", dataColumn: "clauseReference" },
    { title: "Result", dataColumn: "componentText" },
    { title: "Source Name", dataColumn: "sourceName" },
  ]
}];

export const searchResultsMainHeaders = [
    { title: "Identifier", dataColumn: "EnergyMarketMessageIdentifier" },
    { title: "Result", dataColumn: "Result" },
    { title: "Source Name", dataColumn: "sourceName" },
];

export const dataColumnNames = {
  dataitems: "Data Items" ,
  marketmessage: "Market Message",
  scenariovariant: "Scenario Variant",
  schedules: "Schedules Code",
};

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

export const uiVersion = "V2.4.0 - 31/07/23";

export const changeRegister = [
  {
    "Change Proposal Reference": "R0006",
    "Change Proposal Name": "Missing Meter Technical Details",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/new-sdep-process-type",
    "Current Process Stage": "Solution Development",
    "Next Activity":
      "Clarification with Proposer on how this change should be taken forward as part of R0121.",
  },
  {
    "Change Proposal Reference": "R0009",
    "Change Proposal Name": "Introduction of SDEP and EES User Maintenance API",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/introduction-of-sdep-and-ees-user-maintenance-api-ecoes-change-",
    "Current Process Stage": "Awaiting Authority Determination",
    "Next Activity":
      "Appeal pack shared with the Authority for their Determination. ",
  },
  {
    "Change Proposal Reference": "R0017",
    "Change Proposal Name": "Invalid Requests for Site Technical Details",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/invalid-requests-for-site-technical-details",
    "Current Process Stage": "Awaiting Implementation",
    "Next Activity": "Implementation",
  },
  {
    "Change Proposal Reference": "R0026",
    "Change Proposal Name":
      "Whole current (WC)/Current Transformer (CT) certificates",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/whole-current-wc-/current-transformer-ct-certificates",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "On Hold - This change remains on hold.  The focus of the Metering Scheme Auditor is on the embedding of the new scheme and completion of first audits. The Metering Scheme Auditor will be engaged to support the solution development activity for the Change Proposal. A Change Proposal Plan will then be developed and brought back to the Change Panel for approval. ",
  },
  {
    "Change Proposal Reference": "R0037",
    "Change Proposal Name":
      "Prepayment Credit Balance & Debt Transfer Processes",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/prepayment-credit-balance-debt-transfer-processes",
    "Current Process Stage": "Solution Development",
    "Next Activity":
      "The Change Plan has been withdrawn. A new Plan to be agreed with the Proposer ahead of presenting to the Change Panel for approval.",
  },
  {
    "Change Proposal Reference": "R0043",
    "Change Proposal Name":
      "Commissioning of Works using shared Meter Operator services by the Crowded Meter Room Co-ordinator (CMRC)",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/commissioning-of-works-using-shared-meter-operator-services-by-the-crowded-meter-room-co-ordinator-cmrc-",
    "Current Process Stage": "Impact Assessment",
    "Next Activity": "Preliminary Change Report published ",
  },
  {
    "Change Proposal Reference": "R0044",
    "Change Proposal Name":
      "MHHS Programme Changes required to Central Switching Service",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/mhhs-programme-changes-required-to-central-switching-service",
    "Current Process Stage": "Awaiting Implementation",
    "Next Activity": "Implementation",
  },
  {
    "Change Proposal Reference": "R0048",
    "Change Proposal Name":
      "DCC Service Organisation Control 2 (SOC2) Assessments",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/dcc-service-organisation-control-2-soc2-assessments",
    "Current Process Stage": "Solution Development",
    "Next Activity":
      "Further information received from the CSS Provider to enable the solution to be developed. The Change Proposal Plan has been re-baselined to reflect an extended solution development window is required.",
  },
  {
    "Change Proposal Reference": "R0049",
    "Change Proposal Name":
      "Intellectual Property Rights and Services Data Main Body changes",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/intellectual-property-rights-and-services-data-main-body-changes",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority has been assessed as Medium, with a score of 37. The change is currently on hold until a lead analyst is assigned to take the change forward, at which point the Code Manager will complete an initial assessment before setting out the Change Proposal Plan.",
  },
  {
    "Change Proposal Reference": "R0051",
    "Change Proposal Name": "Switch Request Objections (Change of Occupier)",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/switch-request-objections-additional",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "This Change Proposal priority has been reviewed and remains as Low with a score of 70. The change is currently on hold. The priority to be assessed regularly against the portfolio of changes, to determine when the change should progress.",
  },
  {
    "Change Proposal Reference": "R0053",
    "Change Proposal Name": "24/7 Emergency Metering Service",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/24/7-emergency-metering-service",
    "Current Process Stage": "Solution Development",
    "Next Activity":
      "Solution development activity to continue; to explore potential solution options with the industry working group.",
  },
  {
    "Change Proposal Reference": "R0056",
    "Change Proposal Name":
      "EES/GES Additional Service Request for Housing Associations to be added to the Data Access Matrix",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/ees/ges-additional-service-request-for-housing-associations-to-be-added-to-the-data-access-matrix",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of the change has been determined to be low, with a score of 53. The change is currently on hold. The priority to be assessed regularly against the portfolio of changes, to determine when the change should progress.",
  },
  {
    "Change Proposal Reference": "R0057",
    "Change Proposal Name":
      "Clarification of Supplier of Last Resort Obligations under the REC",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/clarification-of-supplier-of-last-resort-obligations-under-the-rec",
    "Current Process Stage": "Solution Development",
    "Next Activity":
      "If PAB Procedures document wording is approved by the Panel, R0057 will be withdrawn and a Cat 3 CP will be raised for the updated document.",
  },
  {
    "Change Proposal Reference": "R0058",
    "Change Proposal Name": "REC Services Procurement Clarification",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/rec-services-procurement-clarification",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of the change has been determined to be low, with a score of 27. The change is currently on hold. The priority to be assessed regularly against the portfolio of changes, to determine when the change should progress.",
  },
  {
    "Change Proposal Reference": "R0059",
    "Change Proposal Name": "Maintenance of Qualification Schedule Change",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/maintenance-of-qualification-schedule-change",
    "Current Process Stage": "Awaiting Implementation",
    "Next Activity": "Implementation",
  },
  {
    "Change Proposal Reference": "R0060",
    "Change Proposal Name": "ERDS Service Definition time zone correction",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/erds-service-definition-timezone-correction",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority has been assessed as low, with a score of 26. The change is currently on hold. The priority to be assessed regularly against the portfolio of changes, to determine when the change should progress.",
  },
  {
    "Change Proposal Reference": "R0061",
    "Change Proposal Name": "Resolution of invalid CSS data by Data Owners",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/resolution-of-invalid-css-data-by-data-owners",
    "Current Process Stage": "Solution Development",
    "Next Activity":
      "Solution Development Conversations underway between the Code Manager, Switching Service Desk, DNOs/iDNOs and MPRS.  ",
  },
  {
    "Change Proposal Reference": "R0062",
    "Change Proposal Name":
      "Removal of ERDA meteringPointEnergyFlow change restriction",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/removal-of-erda-meteringpointenergyflow-change-restriction",
    "Current Process Stage": "Solution Development",
    "Next Activity": "Solution analysis and development to be completed.",
  },
  {
    "Change Proposal Reference": "R0063",
    "Change Proposal Name":
      "Addition of key information to all Service Now tickets",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/addition-of-key-information-to-all-service-now-tickets",
    "Current Process Stage": "Preliminary Assessment",
    "Next Activity": "Preliminary Change Report to be taken to TEP 26/07/2023.",
  },
  {
    "Change Proposal Reference": "R0064",
    "Change Proposal Name":
      "Creating a Meter Operator Agent and MOCoP Installer",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/creating-a-meter-operator-agent-and-mocop-installer",
    "Current Process Stage": "Impact Assessment",
    "Next Activity": "Impact Assessment period closed",
  },
  {
    "Change Proposal Reference": "R0065",
    "Change Proposal Name":
      "Registration of Smart Export Guarantee (SEG) Sites",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/registration-of-smart-export-guarantee-seg-sites",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      " Change Proposal discussed with BSC. BSC CP expected to be raised. Cross code progression of activity will then be planned with BSC. Change on hold until a clear path is determined.",
  },
  {
    "Change Proposal Reference": "R0067",
    "Change Proposal Name": "Introduction of CSS refresh functionality",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/introduction-of-css-refresh-functionality",
    "Current Process Stage": "Awaiting Implementation",
    "Next Activity": "Implementation",
  },
  {
    "Change Proposal Reference": "R0068",
    "Change Proposal Name": "REC Main Body Data Protection Changes",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/rec-main-body-data-protection-changes-and-development-of-a-rec-data-protection-schedule.",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "This change has a priority of low and a score of 83. The Code Manager was due to initiate activity to progress this change, however, higher priority activity has delayed mobilisation. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0069",
    "Change Proposal Name": "Amendments to Sample Access Agreement",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/amendments-to-sample-access-agreement-appended-to-the-qualification-and-maintenance-schedule-9-to-the-code",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Following completion of the initial assessment by the CSS Provider, the priority of the change is to be reviewed against the portfolio of changes, before the next steps are determined and a plan set out by the Code Manager.",
  },
  {
    "Change Proposal Reference": "R0070",
    "Change Proposal Name": "Provision of Enduring Test Environments",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/provision-of-enduring-test-environments",
    "Current Process Stage": "Impact Assessment (Service Provider only)",
    "Next Activity": "DIA (part 2) completion",
  },
  {
    "Change Proposal Reference": "R0071",
    "Change Proposal Name": "DCC access to EES and GES",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/dcc-access-to-ees-and-ges",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Service Provider Initial Assessments have been started. Conversations are currently underway between the Code Manager, the CSS Provider (DCC), and Xoserve to understand the technical requirements and the broader context of the change proposal. Once these initial conversations have concluded, we will develop the Change Proposal Plan and Initial Assessment Report, and look for publication provisionally on 21 July 2023, for Change Panel Approval on 01 August 2023. ",
  },
  {
    "Change Proposal Reference": "R0072",
    "Change Proposal Name": "Introduction of a new Meter Asset Condition Code",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/introduction-of-a-new-meter-asset-condition-code",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "This Change Proposal has reviewed and is been deemed to be Low, with a Priority score of 76.  The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0075",
    "Change Proposal Name": "Enabling Software Product Qualification",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/enabling-software-product-qualification",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 42. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0076",
    "Change Proposal Name": "DNOs notifying Suppliers about Crossed Meters",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/dnos-notifying-suppliers-about-crossed-meters",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 83. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0078",
    "Change Proposal Name": "EMR Settlement Limited - additional access to EES",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/emr-settlement-limited-additional-access-to-ecoes.",
    "Current Process Stage": "Impact Assessment (Service Provider only)",
    "Next Activity": "Publish Preliminary Change Report and Consultation",
  },
  {
    "Change Proposal Reference": "R0079",
    "Change Proposal Name": "Addition of Previous MEM to the EES API",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/addition-of-previous-mem-to-the-ees-api",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 74. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0080",
    "Change Proposal Name": "Improvements to ‘Failed to Deliver’ CSS Messages",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/improvements-to-failed-to-deliver-css-messages",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Following completion of the Service Provider Preliminary Impact Assessment by the CSS Provider, the Code Manager will review the response. The Initial Assessment Report and Change Proposal Plan to be developed to set out the next steps and timings for the progression of the change.",
  },
  {
    "Change Proposal Reference": "R0081",
    "Change Proposal Name": "\tCSS Market Message Retry Strategy",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/css-market-message-retry-strategy",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Change is on hold following a Code Manager/CSS Provider workshop held on 06 April. A derogation has been approved by PAB, this would enable the CSS Provider to test/consider alternative CSS Message retry strategies before an appropriate strategy is taken forward for implementation in the REC. ",
  },
  {
    "Change Proposal Reference": "R0082",
    "Change Proposal Name":
      "Formalising the Submission of PPMIP Unallocated Transaction Report (UTR) Files",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/formalising-the-submission-of-ppmip-unallocated-transaction-report-utr-files",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 47. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0083",
    "Change Proposal Name": "Changes to Supply Number Format for MHHS",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/changes-to-supply-number-format-for-mhhs",
    "Current Process Stage": "Final Assessment",
    "Next Activity":
      "Change Panel consideration of the Final Change Report on 01/08/2023 ",
  },
  {
    "Change Proposal Reference": "R0083A",
    "Change Proposal Name":
      "Changes to Supply Number Format for MHHS (Alternative)",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/changes-to-supply-number-format-for-mhhs-alternative-",
    "Current Process Stage": "Final Assessment",
    "Next Activity":
      "Change Panel consideration of the Final Change Report on 01/08/2023 ",
  },
  {
    "Change Proposal Reference": "R0086",
    "Change Proposal Name":
      "ERDS Upload File in the Data Specification and clarification of cancellation code",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/edrs-upload-file-in-the-data-specification-and-clarification-of-cancellation-code",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 64. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0087",
    "Change Proposal Name": "MAP - GES Portfolio Dashboard",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/map-gas-portfolio-dashboard",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 33. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0088",
    "Change Proposal Name":
      "Make Shipper NExA values available on the GES portal",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/make-shipper-nexa-values-available-on-the-ges-portal",
    "Current Process Stage": "Consultation",
    "Next Activity": "Consolidate Consultation responses once closed.",
  },
  {
    "Change Proposal Reference": "R0089",
    "Change Proposal Name":
      "Removal of Pre-COVID AQ Value from Data Access Matrix\n",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/removal-of-pre-covid-aq-value-from-data-access-matrix",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 32. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when this change should start to be progressed.",
  },
  {
    "Change Proposal Reference": "R0092",
    "Change Proposal Name":
      "DCC Service Level Agreements for the Switching Incentive Regime\n",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/dcc-service-level-agreements-for-the-switching-incentive-regime",
    "Current Process Stage": "Solution Development",
    "Next Activity": "Next meeting scheduled 27/07/2023.",
  },
  {
    "Change Proposal Reference": "R0093",
    "Change Proposal Name":
      "Uplift to CSS Maximum Demand Volumes during MHHS Migration Period",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/uplift-to-css-maximum-demand-volumes-during-mhhs-migration-period",
    "Current Process Stage": "Impact Assessment",
    "Next Activity":
      "Service Provider Preliminary Impact Assessment period to be completed",
  },
  {
    "Change Proposal Reference": "R0094",
    "Change Proposal Name":
      "Clarify obligations on gas meter exchanges that occur close to CoS",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/clarify-obligations-on-meter-exchanges-that-occur-close-to-cos-gas-only",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Change Proposal to be discussed at the RIG on 11/08/2023 to help develop the IAR & CPP",
  },
  {
    "Change Proposal Reference": "R0095",
    "Change Proposal Name":
      "Changes to allow DNOs to reinstate disconnected MPANs",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/changes-to-allow-dnos/-to-reinstate-disconnected-mpans",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Development of the IAR & CPP for approval by Change Panel",
  },
  {
    "Change Proposal Reference": "R0096",
    "Change Proposal Name": "CSS Message Regeneration Functionality",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/css-message-regeneration-functionality",
    "Current Process Stage": "Impact Assessment (Service Provider only)",
    "Next Activity":
      "Following the definition of technical solution requirements a Preliminary Impact Assessment was triggered with the CSS Provider on 07 June 2023, this is due to be returned on 05 July 2023.  The Code Manager will then review the retunred PIA from the CSS Provider.",
  },
  {
    "Change Proposal Reference": "R0097",
    "Change Proposal Name":
      "Consequential Change for CSS Smart Meter Data Retriever Appointments",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/consequential-change-for-css-smart-meter-data-retriever-appointments",
    "Current Process Stage": "Awaiting Implementation",
    "Next Activity": "N/a",
  },
  {
    "Change Proposal Reference": "R0098",
    "Change Proposal Name": "Optional fuzzy searching in EES",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/optional-fuzzy-searching-in-ees",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been reviewed. It remains a low priority with a score of 66. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0099",
    "Change Proposal Name": "CSS End User Obligations",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/css-end-user-obligations",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 91. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0100",
    "Change Proposal Name": "Update to Error Handling Documents",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/update-to-error-handling-documents",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Code Manager to identify the changes required to the REC Products, at which point the need for a Standard CP (rather than Cat 3 CP) to be confirmed. The priority of this change has been assessed as low, with a score of 57. If a standard CP is required, this change will be assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0103",
    "Change Proposal Name":
      "Central provision of DCC Technical Contacts for requesting test certificates",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/central-provision-of-dcc-technical-contacts-for-requesting-test-certificates",
    "Current Process Stage": "Impact Assessment",
    "Next Activity":
      "Impact assessment has been initiated, targeting REC Parties and CSS Users. The IA period is due to close on 28 July 2023",
  },
  {
    "Change Proposal Reference": "R0104",
    "Change Proposal Name":
      "Clarifying requirement for continuous billing following an Erroneous Switch",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/clarifying-requirement-for-continuous-billing-following-an-erroneous-wwitch?p_l_back_url=%2Fsearch%3Fp_p_lifecycle%3D0%26p_p_mode%3Dview%26_com_liferay_portal_workflow_task_web_portlet_MyWorkflowTaskPortlet_mvcPath%3D%252Fview.jsp%26q%3Dr0104",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 84. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0105",
    "Change Proposal Name": "Review of ONAGE SLAs",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/review-of-onage-slas",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 84. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0106",
    "Change Proposal Name": "Performance Assurance Report Catalogue V5.1",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/performance-assurance-report-catalogue-v5.1",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 63. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0107",
    "Change Proposal Name": "CSS Message Time Stamping",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/css-message-time-stamping",
    "Current Process Stage": "Impact Assessment (Service Provider only)",
    "Next Activity":
      "Following the definition of technical solution requirements a Preliminary Impact Assessment was triggered with the CSS Provider on 07 June 2023, this is due to be returned on 05 July 2023.  The Code Manager will then review the retunred PIA from the CSS Provider.",
  },
  {
    "Change Proposal Reference": "R0108",
    "Change Proposal Name":
      "Enabling Electricity Enquiry Service searches using a Unique Property Reference Number",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/enabling-electricity-enquiry-service-searches-using-a-unique-property-reference-number",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 62. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0109",
    "Change Proposal Name":
      "Aligning electricity and gas timescale requirements for sharing Meter Technical Detail information",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/aligning-electricity-and-gas-timescale-requirements-for-sharing-meter-technical-detail-information",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 68. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0110",
    "Change Proposal Name": "A review of Supplier access to data on GES",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/a-review-of-supplier-access-to-data-on-ges",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Initial discussions between the GES Service Provider, RPS and the Proposer have yielded a fully formed solution. We are looking to publish the IAR/CPP on 21/07/23 ahead of 01/08/2023 Change Panel. ",
  },
  {
    "Change Proposal Reference": "R0111",
    "Change Proposal Name":
      "Provision of Grid Supply Point Group ID from a Postcode search",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/provision-of-grid-supply-point-group-id-from-a-postcode-search",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 68. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0112",
    "Change Proposal Name":
      "Supplier compensation for Network Party driven MPXN or GSP Group changes",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/supplier-compensation-for-network-party-driven-mpxn-or-gsp-group-changes",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 33. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0113",
    "Change Proposal Name":
      "Data Specification Housekeeping and Clarifications",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/data-specification-housekeeping-and-clarifications",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The code Manager is identifying the housekeeping changes needed to the Data Specification to resolve ambiguity and provide clarity, ahead of setting out the proposed changes in a Change Report for review by the Change Panel. It is expected that this change will follow the Housekeeping Change Process.",
  },
  {
    "Change Proposal Reference": "R0115",
    "Change Proposal Name":
      "Frequency and content of CSS reports on switching via the DCC portal",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/frequency-and-content-of-css-reports-on-switching-via-the-dcc-portal",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority has been assessed as Medium with a score of 128. The Code Manager to assign a lead analyst and completed an initial assessment ahead of the change being progressed.",
  },
  {
    "Change Proposal Reference": "R0116",
    "Change Proposal Name":
      "TPI access to the Meter Asset Manager data via the GES",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/tpi-access-to-the-meter-asset-manager-data-via-the-ges",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 86. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0117",
    "Change Proposal Name":
      "Retrospective Implementation of Distribution Code Use of System Agreement (DCUSA) DCP 383",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/retrospective-implementation-of-distribution-code-use-of-system-agreement-dcusa-dcp-383",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "Targeted date for IAR and CPP to be taken to Change Panel.",
  },
  {
    "Change Proposal Reference": "R0118",
    "Change Proposal Name":
      "Review of Schedule 12 and processes to manage access to data ",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/review-of-schedule-12-and-processes-to-manage-access-to-data",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as medium with a score of 136. This Change Proposal will deliver the changes to the REC following the RECCo review and cataloguing of REC data sources, with the aim of broadening the access to data under the REC. This change is currently on hold until the RECCo review concludes and the changes to the REC have been determined. ",
  },
  {
    "Change Proposal Reference": "R0119",
    "Change Proposal Name": "Annulment Definition",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/annulment-housekeeping",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 83. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0120",
    "Change Proposal Name":
      "Ability to search GES API using Meter Serial Number",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/search-ges-api-using-meter-serial-number",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 62. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0121",
    "Change Proposal Name":
      "SDEP Review Improvements (1) - Process Types and escalations",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/sdep-review-improvements-1-process-types-and-escalations",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as medium with a score of 126. This change is currently on hold until a Change Lead is assigned to start the progression. ",
  },
  {
    "Change Proposal Reference": "R0122",
    "Change Proposal Name": "SDEP Review Improvements (2) - Usability",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/sdep-review-improvements-2-usability",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as medium with a score of 126. This change is currently on hold until a Change Lead is assigned to start the progression. ",
  },
  {
    "Change Proposal Reference": "R0123",
    "Change Proposal Name": "SDEP Review Improvements (3) - Look and feel",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/sdep-review-improvements-3-look-and-feel",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as medium with a score of 103. This change is currently on hold until a Change Lead is assigned to start the progression. ",
  },
  {
    "Change Proposal Reference": "R0124",
    "Change Proposal Name": "SDEP Review Improvements (4) - Reporting",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/sdep-review-improvements-4-reporting",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as medium with a score of 103. This change is currently on hold until a Change Lead is assigned to start the progression. ",
  },
  {
    "Change Proposal Reference": "R0125",
    "Change Proposal Name":
      "SDEP Review Improvements (5) – multilateral Erroneous Switches",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/sdep-review-improvements-5-multilateral-erroneous-switches",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as medium with a score of 103. This change is currently on hold until a Change Lead is assigned to start the progression. ",
  },
  {
    "Change Proposal Reference": "R0126",
    "Change Proposal Name":
      "SDEP Review Improvements (6) – SDEP User Guide and Obligations",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/sdep-review-improvements-6-sdep-user-guide-and-obligations",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 71. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0127",
    "Change Proposal Name":
      "New EES User Category for the Department for Education",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/new-ees-user-category-for-the-department-for-education?p_l_back_url=%2Fsearch%3Fq%3Dr0127",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 99. This change is currently on hold until a Change Lead is assigned to start the progression. ",
  },
  {
    "Change Proposal Reference": "R0128",
    "Change Proposal Name":
      "Removal of CSS Business Rule 1177 to reflect OFAF optionality",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/removal-of-css-business-rule-1177-to-reflect-ofaf-optionality",
    "Current Process Stage": "Preliminary Assessment",
    "Next Activity":
      "Publish Preliminary Change Report for Consultation on 28/07/23.",
  },
  {
    "Change Proposal Reference": "R0129",
    "Change Proposal Name": "Clarifying Event of Default requirements",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/clarifying-event-of-default-requirements",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 87. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0130",
    "Change Proposal Name": "Updates to the Data Access Matrix",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/updates-to-the-data-access-matrix",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 59. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0131",
    "Change Proposal Name": "Creation of new Enquiry Service User Category",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/creation-of-new-enquiry-service-user-category",
    "Current Process Stage": "Initial Assessment",
    "Next Activity":
      "The priority of this Change Proposal has been assessed as low with a score of 62. The priority will be reviewed regularly and assessed against the portfolio of changes to determine when the change should start progression.",
  },
  {
    "Change Proposal Reference": "R0132",
    "Change Proposal Name":
      "Change the Logical Format of the J0001 (DI50001) ‘Market Participant Role Code’ data item to Char(2)",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/change-the-logical-format-of-the-j0001-di50001-market-participant-role-code-data-item-to-char-2-",
    "Current Process Stage": "New",
    "Next Activity": "Needs to go through priortisation",
  },
  {
    "Change Proposal Reference": "R0133",
    "Change Proposal Name":
      "Consequential Cross-Code Change for BSC P441 - Complex Site Classes Creation",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/consequential-cross-code-change-for-bsc-p441-complex-site-classes-creation",
    "Current Process Stage": "Solution Development",
    "Next Activity": "Solution Development Completed",
  },
  {
    "Change Proposal Reference": "R0134",
    "Change Proposal Name": "VLP data access requirements",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/vlp-data-access-requirements",
    "Current Process Stage": "New",
    "Next Activity": "Needs to go through priortisation",
  },
  {
    "Change Proposal Reference": "R0135",
    "Change Proposal Name": "Add DESNZ to Schedule 12",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/add-beis-to-schedule-12",
    "Current Process Stage": "New",
    "Next Activity": "Needs to go through priortisation",
  },
  {
    "Change Proposal Reference": "R0136",
    "Change Proposal Name":
      "Change to REC Schedule 22 Market Stabilisation Charge (MSC)",
    "Link to CP page":
      "https://recportal.co.uk/group/guest/-/change-to-rec-schedule-22-market-stabilisation-charge-msc-",
    "Current Process Stage": "New",
    "Next Activity": "Needs to go through priortisation",
  },
];

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
    documentType: "",
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
