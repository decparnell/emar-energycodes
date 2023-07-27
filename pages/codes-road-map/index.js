import styles from "../../styles/codesRoadMap.module.css";
import Head from "next/head";
import QuickLink from "../../components/helperFunctions/quickLink";
import React, { useEffect } from "react";
import { BiDownload } from "react-icons/bi";
import { LogUserInfo } from "../../components/logging";
import SecondNavbar from "../../components/layout/secondHeader";
function CodesRoadMap({ latestCodesRoadMapLinkJSON }) {
  const apiResList = [
    { obj: latestCodesRoadMapLinkJSON, name: "latestCodesRoadMapLinkJSON" },
  ];
  const wikiPage =
    "https://recportal.co.uk/rec-wiki-landing/-/knowledge_base_search/677762514/maximized?_com_liferay_knowledge_base_web_portlet_SearchPortlet_redirect=https%3A%2F%2Frecportal.co.uk%3A443%2Frec-wiki-landing%3Fp_p_id%3Dcom_liferay_knowledge_base_web_portlet_SearchPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_p_mode%3Dview%26_com_liferay_knowledge_base_web_portlet_SearchPortlet_mvcPath%3D%252Fsearch%252Fsearch.jsp%26_com_liferay_knowledge_base_web_portlet_SearchPortlet_keywords%3Droadmap%26_com_liferay_knowledge_base_web_portlet_SearchPortlet_formDate%3D1680000364694";

  const downloadIcon = (
    <BiDownload
      style={{
        height: "10%",
        width: "8%",
        color: "green",
        marginLeft: "-7%",
      }}
    />
  );

  useEffect(() => {
    LogUserInfo("Codes Road Map");
  }, []);

  return (
    <>
      <Head>
        <title>Codes Road Map</title>
        <meta
          property="og:title"
          content="Codes Road Map"
          key="codes-road-map"
        />
      </Head>
      <div className={`${styles.secondNavbar}`}>
        <SecondNavbar pageType="Data Spec Page" />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>The Code Road Map</h1>
        <section className={`${styles.mainContentContainer} `}>
          <div className={`${styles.left} box`}>
            <h4 className={styles.title}>What is it?</h4>
            <p className={styles.paragraph}>
              The REC Code Roadmap provides a view of the key areas of strategic
              change that RECCo and the REC Code Manager will focus on over the
              next three years. These are areas of the REC where significant
              benefit could be gained for all REC stakeholders including
              consumers, within the long-term energy retail landscape.
            </p>
            <p className={styles.paragraph}>
              The ‘epics’ are the work items that will deliver the change. The
              roadmap presents the epics that are active now and those that are
              due to be initiated in the coming months, so you can see what may
              be of interest to you and how you can get involved in shaping the
              solutions.
            </p>
          </div>

          <div className={`${styles.right} `}>
            <div className={`${styles.leftContainer} box`}>
              {latestCodesRoadMapLinkJSON.map((item) => (
                <a
                  href={item.link}
                  key={item.codesRoadMapLinksId}
                  download
                  className={styles.downloadLink}
                >
                  <div>Spreadsheet to download containing the roadmap</div>
                  {downloadIcon}
                </a>
              ))}
            </div>

            <div className={styles.bottomContainer}>
              <div className={`${styles.leftContainer} box`}>
                <h4 className={styles.title}>Find Out More</h4>
                <p className={styles.paragraph}>
                  If you want to know more about the roadmap purpose and
                  process,{" "}
                  <a href={wikiPage} target="_blank" rel="noreferrer">
                    visit the Wiki page here.
                  </a>
                </p>
                <p className={styles.paragraph}>
                  The roadmap launched in March 2023 and it will evolve over
                  time – we welcome your views on how we can develop it further
                  for you.  If you have comments or feedback on any aspect of
                  the roadmap, please contact{" "}
                  <a
                    href="#"
                    onClick={() =>
                      (window.location = "mailto:enquiries@recmanager.co.uk")
                    }
                  >
                    enquiries@recmanager.co.uk
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className={`${styles.bottom}`}>
          {/* <div className={`${styles.quickLinkContainer2}`}>
            <QuickLink title="" link="/" width="20%" height="65%" />
            <QuickLink title="" link="/" width="20%" height="65%" />
            <QuickLink title="" link="/" width="20%" height="65%" />
            <QuickLink title="" link="/" width="20%" height="65%" />
            <QuickLink title="" link="/" width="25%" height="65%" />
            <QuickLink title="" link="/" width="25%" height="65%" />
            <QuickLink title="" link="/" width="25%" height="65%" />
          </div>
          <div className={`${styles.upcomingChangesContent} box`}></div> */}
        </div>
      </div>
    </>
  );
}

export default CodesRoadMap;

//This gets called on every request
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );

  //fetch data from external API
  const getLatestCodesRoadMapLink = await fetch(
    "https://prod-00.uksouth.logic.azure.com:443/workflows/6f41392a02a5439c94c9f97ca8228dff/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=lNXz4b-1HKJqWkpK9XFVdU4KsqzYRvhYZ5ZBjJtlgZI"
  );
  const latestCodesRoadMapLinkJSON = await getLatestCodesRoadMapLink.json();

  //Passing the data to the code-road-map page via props
  return {
    props: {
      latestCodesRoadMapLinkJSON,
    },
  };
}
