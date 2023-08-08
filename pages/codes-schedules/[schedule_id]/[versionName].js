import { useRouter } from "next/router";
import styles from "../../../styles/schedules-dataspec.module.css";
import { useState, useContext, useEffect } from "react";
import SideNav from "../../../components/dashboardSideNav";
import { checkIfVariablesAreAvailable } from "../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { checkIfItemsAvailableInArray } from "../../../components/helperFunctions/checkIfItemsAvailableInArray";
import SchedulesTables from "../../../components/tables/schedulesTables";
import CreateSchedulesContent from "../../../components/scheduleId/createSchedulesContent";
import Head from "next/head";
import { LogUserInfo } from "../../../components/logging";
import SecondNavbar from "../../../components/layout/secondHeader";
import AppContext from "../../../components/context/AppContext";
import DocumentDownload from "../../../components/documentDownload";

function Schedules({
  versions,
  parts,
  sections,
  document,
  definitions,
  optionalityInfo,
}) {
  const apiVarList = [
    { obj: versions, name: "versions" },
    { obj: parts, name: "parts" },
    { obj: sections, name: "sections" },
    { obj: document, name: "document" },
  ];
  const value = useContext(AppContext);
  let { latestDataSpecVersion, currentVersionMapping } = value.state;

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);
  const docInfo = checkIfItemsAvailableInArray(internalErrorLog, "document")
    ? document[0]
    : null;

  const router = useRouter();
  const scheduleId = router.query.schedule_id;
  const docVersionName = router.query.versionName;

  const scheduleNumber = docInfo.scheduleNumber;
  const scheduleName = docInfo.documentName;

  const mandatoryTable = transformTable(optionalityInfo, parts);

  const [urlDownload, setUrlDownload] = useState(null);

  const panelDashboard = parts.map((part) => {
    const dashboard = filterByFieldId(sections, "partId_FK", part.partId);
    return {
      partId: part.partId,
      panelTitle: part.partName,
      dashboard,
    };
  });

  useEffect(() => {
    if (currentVersionMapping != null) {
      const currentDocVersionName = currentVersionMapping.filter(
        (item) => item.documentId == scheduleId
      )[0].docVersionName;

      if (docVersionName !== currentDocVersionName) {
        router.push(
          `/codes-schedules/${router.query.schedule_id}/${currentDocVersionName}`
        );
      }
    }
  }, [currentVersionMapping]);

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

  const [currentSections, setCurrentSections] = useState(() => {
    return panelDashboard[0];
  });

  useEffect(() => {
    LogUserInfo(`${docInfo.documentName} V${docVersionName}`);
    handleDownloadDoc();
    fetchData();
  }, []);

  useEffect(() => {
    handleDownloadDoc();
  }, [docVersionName]);

  /* ****FUNCTIONS**** */
  //client-side fetch data, loading more components of each section
  const fetchData = async () => {
    const incrementalStartVal = 21;
    setIsLoading(true);
    setError(null);
    try {
      //getScheduleComponents-LogicApp
      const response = await fetch(
        `https://prod-15.uksouth.logic.azure.com/workflows/05ebc2734c5340bb83e78396ae4ca88f/triggers/request/paths/invoke/documentId/${scheduleId}/version/${docVersionName}/startVal/${startVal}?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=-7jIZukmQmoddagifC2Z1FxKEWg7VLMfp2mcg-sAKPE`
      );
      const dataResJson = await response.json();
      const newDataComponents = dataResJson;
      if (startVal === 0) {
        setComponentsData(newDataComponents);
      }else if (typeof newDataComponents === "undefined") {
        setHasMoreData(false);
      } else {
        setComponentsData((prevData) => [...prevData, ...newDataComponents]);
      }
      setStartVal((prevVal) => prevVal + incrementalStartVal);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      console.log(componentsData);
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

  ///////DEC -  USE THIS TO JUMP TO DATA _ MAY NEED TO EXTEND API TO INC THIS
  function jumpToSection(sectionId) {
    /* while (
      componentsData[componentsData.length - 1].clauseReference.indexOf(
        `${sectionId}.`
      ) === -1
    ) {
      fetchData();
    } */
    console.log("here");
    console.log(componentsData);
  }

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
          dashboardId="sectionId"
          name="sectionName"
          panelTitle="panelTitle"
          dashboardName="dashboard"
          stateVar={currentSections}
          stateSet={setCurrentSections}
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

        <CreateSchedulesContent
          parts={parts}
          definitions={definitions}
          data={groupSectionsAndComponents}
          fetchData={fetchData}
          hasMoreData={hasMoreData}
          totalLength={startVal}
        />
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
  const document = dataJson.document;

  const definitionsReq = await fetch(
    `https://prod-28.uksouth.logic.azure.com:443/workflows/32adcb866eed49d998b350e43e4386ac/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I3PFridsAI83LG9Df3hipu3Z4V4qgmj8VvJ0ijYrYz8`
  );
  const definitionsJson = await definitionsReq.json();
  let definitions = definitionsJson.definitions;
  const scheduleLinks = definitionsJson.scheduleLinks;
  const dataSpecLinks = definitionsJson.dataSpecLinks;
  definitions = definitions.concat(scheduleLinks).concat(dataSpecLinks);

  const optionalityReq = await fetch(
    `https://prod-14.uksouth.logic.azure.com/workflows/4f3b0f9b10f14137afd1fca0686b8119/triggers/manual/paths/invoke/documentId/${document[0].documentId}/versionId/${context.params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lVJcdlsL4DY-LixBpllt8Ats8IO9LiJjpjs6FxZovjg`
  );
  const optionalityInfo = await optionalityReq.json();

  //Pass data to the page via props
  return {
    props: {
      versions,
      parts,
      sections,
      document,
      definitions,
      optionalityInfo,
    },
  };
}
