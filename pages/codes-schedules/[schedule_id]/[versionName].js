import Head from "next/head";
import styles from "../../../styles/schedules-dataspec.module.css";
import AppContext from "../../../components/context/AppContext";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import SideNav from "../../../components/dashboardSideNav";
import SchedulesTables from "../../../components/tables/schedulesTables";
import CreateSchedulesContent from "../../../components/scheduleId/createSchedulesContent";
import SecondNavbar from "../../../components/layout/secondHeader";
import DocumentDownload from "../../../components/documentDownload";
import DefinitionTables from "../../../components/tables/definitionsTables";
import { LogUserInfo } from "../../../components/logging";
import { checkIfVariablesAreAvailable } from "../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { checkIfItemsAvailableInArray } from "../../../components/helperFunctions/checkIfItemsAvailableInArray";
import { scheduleInterpretationDefinitions } from "../../../components/settings";

function Schedules({
  versions,
  parts,
  sections,
  documents,
  definitions,
  optionalityInfo,
}) {

  const apiVarList = [
    { obj: versions, name: "versions" },
    { obj: parts, name: "parts" },
    { obj: sections, name: "sections" },
    { obj: documents, name: "documents" },
  ];
  const value = useContext(AppContext);
  let { latestDataSpecVersion, currentVersionMapping } = value.state;

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);
  const docInfo = checkIfItemsAvailableInArray(internalErrorLog, "documents")
    ? documents[0]
    : null;

  const panelDashboard = parts.map((part) => {
    const dashboard = filterByFieldId(sections, "partId_FK", part.partId);
    return {
      partId: part.partId,
      panelTitle: part.partName,
      dashboard,
    };
  });

  const router = useRouter();
  const scheduleId = router.query.schedule_id;
  const docVersionName = router.query.versionName;
  const scheduleNumber = docInfo.scheduleNumber;
  const scheduleName = docInfo.documentName;

  const mandatoryTable = transformTable(optionalityInfo, parts);

  const [urlDownload, setUrlDownload] = useState(null);
  const [componentId, setComponentId] = useState(router.query.componentId);
  const [componentsData, setComponentsData] = useState([]);
  const [startVal, setStartVal] = useState(0);

  ////DEC - ISSUE WITH SCROLL _ FETCH DATA GETS DOUBLE TRIGGERED ON PAGE RELOAD
  /* if (typeof window != "undefined" && startVal === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } */
  //const [totalLength, setTotalLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [shouldFetchMoreData, setShouldFetchMoreData] = useState(false);

  const [currentSections, setCurrentSections] = useState(() => {
    return panelDashboard[0];
  });

  useEffect(() => {
    if (currentVersionMapping != null) {
      const currentDocVersionName = currentVersionMapping.filter(
        (item) => item.documentId == scheduleId
      )[0].docVersionName;

      //Is needed when recVersion Dropdown change but interfere when form the serach table a link is selected
      if (docVersionName !== currentDocVersionName && componentId == undefined) {
        router.push(`/codes-schedules/${scheduleId}/${currentDocVersionName}`);
      }
    }
  }, [currentVersionMapping]);

  useEffect(() => {
    LogUserInfo(`${docInfo.documentName} V${docVersionName}`);
    handleDownloadDoc();
    fetchData();
  }, []);

  useEffect(() => {
    handleDownloadDoc();
    resetVarToDefault();
    if (!componentId) {
      scrollToDiplayContent(); // ! important do not remove this, reason given on the description of the function
    }
  }, [docVersionName]);

  useEffect(() => {
    if (shouldFetchMoreData) {
      fetchData();
    }
  }, [shouldFetchMoreData, currentSections]);

  useEffect(() => {
    if (typeof window != "undefined" && componentId && isLoading === false) {
      const element = document.getElementById(componentId);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [isLoading]);


  /* ****FUNCTIONS**** */
  //client-side fetch data, loading more components of each section
  const fetchData = async () => {
    let incrementalStartVal = 21;

    // getScheduleComponents-v2
    let url = `https://prod-20.uksouth.logic.azure.com/workflows/292329c8d3eb4160a0d3c65fc9ea299d/triggers/request/paths/invoke/documentId/${scheduleId}/version/${docVersionName}/startVal/${startVal}?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=n4gKcezdLeZQlKnP6Fnxbm5l5ipRdcNsa7-KKGI3d_M`;


    // getScheduleComponentsById
    if (componentId) {
      url = `https://prod-11.uksouth.logic.azure.com/workflows/394639809678409da53285be11d9f93c/triggers/request/paths/invoke/documentId/${scheduleId}/componentId/${componentId}/version/${docVersionName}/startVal/${startVal}?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=Wo6RW-aJSD8VrKB7KEte6ZIvoqPKCQeBpB2RhcotSMM`;
    }

    // getScheduleComponentsBySectionId
    // Document 2 contains Interpretations and Definitions 
    if (shouldFetchMoreData && scheduleId != 2) {
      const section = document.getElementById(`sec${currentSections.sectionId}`);
      if (!section) {
        url = `https://prod-12.uksouth.logic.azure.com/workflows/af401b46bd564f10a9005955f43ca7aa/triggers/request/paths/invoke/documentId/${scheduleId}/sectionId/${currentSections.sectionId}/version/${docVersionName}/startVal/${startVal}?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=j2wbZbXO2SXnNLr_XkiN_Cf788ccZSuW1agtUsxUELs`;
      }
    }

    setError(null);
    if (isLoading != true) {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const dataResJson = await response.json();
        const newDataComponents = dataResJson;

        if (startVal === 0) {
          setComponentsData(newDataComponents);
        } else if (newDataComponents.length == 0 || scheduleId == scheduleInterpretationDefinitions || typeof newDataComponents === "undefined") {
          setStartVal(componentsData.length);
          setHasMoreData(false);
        } else {
          setComponentsData((prevData) => [...prevData, ...newDataComponents]);
        }

        if ((componentId) && typeof newDataComponents != "undefined") {
          incrementalStartVal = newDataComponents.length - startVal + 1;
        }

        setStartVal((prevVal) => prevVal + incrementalStartVal);

        if (shouldFetchMoreData) {
          setStartVal(newDataComponents[newDataComponents.length - 1].RowNum + 1);
        }

        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setShouldFetchMoreData(false);
        if (shouldFetchMoreData && isLoading == false) {
          value.setTriggerScrollDown(true);
        }
        setComponentId(undefined);
      }
    }
  };

  const handleDownloadDoc = async () => {
    try {
      const response = await fetch(
        `https://prod-03.uksouth.logic.azure.com/workflows/076c8da5b74d452abc028069f5a1ac4e/triggers/manual/paths/invoke/searchValue/${scheduleName}/versionNumber/${docVersionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wywtlxVddPbnw_SwqTbYDKCPB_9rfU085Qb5IvDk0A4`
      );
      const urllinkJson = await response.json();
      setUrlDownload(urllinkJson.url);
    } catch (error) {
      setError(error);
    }
  };

  /* create data for mandatory table, X axis being parts, Y axis optionality owners.
     structured as object with:
     keys being optionality.ownersName
     values being an array of optionality.
     optionalityNames (Mandatory, N/A)
   */
  function transformTable(optionalities, parts) {
    let res = {};
    for (const el of optionalities) {
      // each optionality owner gets a key
      res[el.ownersName] = [];
      const ownersId = el.ownersId;
      for (const part of parts) {
        // find a match between optionalities and parts by ownersId and partId
        const value = optionalities.find(
          (el) => el.ownersId === ownersId && el.partId === part.partId
        );
        if (value !== undefined) {
          res[el.ownersName].push(value.optionalityName);
        }
      }
    }
    return res;
  }

  //Filter JSON object by specific field and id
  function filterByFieldId(jsonData, field_name, id) {
    return jsonData.filter((obj) => obj[field_name] === id);
  }


  //Reset all the indicated variables
  function resetVarToDefault() {
    setHasMoreData(true);
    setShouldFetchMoreData(false);
    setStartVal(0);
    setComponentsData([]);
  }

  /* Function to scroll smoothly to a specific Y coordinate
     important! this the scrooldown of y coordinate is needed due to the infinite-scroll
     if you remove this it might show the loading screen infinitily 
     (the reason is uncertain, but mostly possible) of the external library (infinite-scroll)
  */
  function scrollToDiplayContent() {
    setTimeout(() => {
      window.scrollTo({
        top: 150,         //Y coordinate
        behavior: 'smooth'
      });
    }, 3000); // 3seconds
  }

  // actual data - groupped all components by sections
  const groupSectionsAndComponents = sections
    .map((section) => {
      const components = filterByFieldId(
        componentsData,
        "sectionId_FK",
        section.sectionId
      );
      if (components.length > 0) {
        return {
          ...section,
          components,
        };
      }
    })
    .filter((group) => group !== undefined);

  return (
    <div className={styles.infinitescrollContainer}>
      <Head>
        <title>
          EMAR - {docInfo ? docInfo.documentName : "code schedules"}
        </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={`${styles.secondNavbar}`}>
        <SecondNavbar pageType="Data Spec Page" />
      </div>
      <div className={`${styles.sideNavContainer}`}>
        <SideNav
          navbarType="PanelBasedNavBar"
          items={panelDashboard}
          scheduleId={scheduleId}
          dashboardId="sectionId"
          name="sectionName"
          panelTitle="panelTitle"
          dashboardName="dashboard"
          stateVar={currentSections}
          stateSet={setCurrentSections}
          setShouldFetchMoreData={setShouldFetchMoreData}
          fetchData={fetchData}
        />
      </div>
      <DocumentDownload type="schedule" url={urlDownload} />
      <div className={styles.infinitescrollMainContainer}>
        <h3 className={styles.headers}>
          {scheduleNumber
            ? `${scheduleName} - Schedule ${scheduleNumber}`
            : scheduleName}
        </h3>
        <div className={styles.tablesContainer}>
          <SchedulesTables
            tableId="Version Table"
            versions={versions}
            scheduleId={scheduleId}
            versionName={docVersionName}
          />
        </div>

        <div className={styles.tablesContainer}>
          {/* if there is at least one optionality show a mandatory table */}
          {optionalityInfo[0].optionalityId && (
            <SchedulesTables
              tableId="Mandatory Table"
              parts={parts}
              mandatoryTable={mandatoryTable}
            />
          )}
        </div>

        {shouldFetchMoreData ? <p className={`${styles.loadingCustomStyle} loading-container`}>Loading</p> :
          <CreateSchedulesContent
            scheduleId={scheduleId}
            parts={parts}
            definitions={definitions}
            data={groupSectionsAndComponents}
            fetchData={fetchData}
            hasMoreData={hasMoreData}
            totalLength={startVal}
          />
        }
        {
          scheduleId == scheduleInterpretationDefinitions ?
            <div className={styles.tablesContainer}>
              <DefinitionTables
                definitions={definitions}
              />
            </div>
            : null
        }

      </div>
    </div>
  );
}

export default Schedules;

export async function getServerSideProps(context) {
  //return the info about the latest version

  // getLatestScheduleInformation-LogicApp-v2
  const initialDataReq = await fetch(
    `https://prod-06.uksouth.logic.azure.com/workflows/77e02eb742f8439e8036ac554294f30c/triggers/request/paths/invoke/documentId/${context.params.schedule_id}/version/${context.params.versionName}/?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=wbnwIPxUSyYKnGUfsB4NFCDZO02dcJLEquai1Nw4Iao`
  );

  const dataJson = await initialDataReq.json();

  const versions = dataJson.versions;
  const parts = dataJson.parts;
  const sections = dataJson.sections;
  const documents = dataJson.document;

  const definitionsReq = await fetch(
    `https://prod-28.uksouth.logic.azure.com:443/workflows/32adcb866eed49d998b350e43e4386ac/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I3PFridsAI83LG9Df3hipu3Z4V4qgmj8VvJ0ijYrYz8`
  );
  const definitionsJson = await definitionsReq.json();
  let definitions = definitionsJson.definitions;
  const scheduleLinks = definitionsJson.scheduleLinks;
  const dataSpecLinks = definitionsJson.dataSpecLinks;
  definitions = definitions.concat(scheduleLinks).concat(dataSpecLinks);

  const optionalityReq = await fetch(
    `https://prod-14.uksouth.logic.azure.com/workflows/4f3b0f9b10f14137afd1fca0686b8119/triggers/manual/paths/invoke/documentId/${documents[0].documentId}/versionId/${context.params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lVJcdlsL4DY-LixBpllt8Ats8IO9LiJjpjs6FxZovjg`
  );
  const optionalityInfo = await optionalityReq.json();

  //Pass data to the page via props
  return {
    props: {
      versions,
      parts,
      sections,
      documents,
      definitions,
      optionalityInfo,
    },
  };
}
