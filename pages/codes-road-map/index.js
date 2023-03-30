import styles from "../../styles/codesRoadMap.module.css";
import React from "react";

function CodesRoadMap({ latestCodesRoadMapLinkJSON }) {
  const apiResList = [
    { obj: latestCodesRoadMapLinkJSON, name: "latestCodesRoadMapLinkJSON" },
  ];
  const wikiPage =
    "https://recportal.co.uk/rec-wiki-landing/-/knowledge_base_search/677762514/maximized?_com_liferay_knowledge_base_web_portlet_SearchPortlet_redirect=https%3A%2F%2Frecportal.co.uk%3A443%2Frec-wiki-landing%3Fp_p_id%3Dcom_liferay_knowledge_base_web_portlet_SearchPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_p_mode%3Dview%26_com_liferay_knowledge_base_web_portlet_SearchPortlet_mvcPath%3D%252Fsearch%252Fsearch.jsp%26_com_liferay_knowledge_base_web_portlet_SearchPortlet_keywords%3Droadmap%26_com_liferay_knowledge_base_web_portlet_SearchPortlet_formDate%3D1680000364694";
  return (
    <>
      <div className={styles.container}>
        <table className={styles.tableCRM}>
          <tbody>
            <tr>
              <td>
                <b>The REC Code Roadmap</b>
                <br></br>
                <p>
                  The REC Code Roadmap provides a view of the key areas of
                  strategic change that RECCo and the REC Code Manager will
                  focus on over the next three years. These are areas of the REC
                  where significant benefit could be gained for all REC
                  stakeholders including consumers, within the long-term energy
                  retail landscape.
                </p>
                <p>
                  The ‘epics’ are the work items that will deliver the change.
                  The roadmap presents the epics that are active now and those
                  that are due to be initiated in the coming months, so you can
                  see what may be of interest to you and how you can get
                  involved in shaping the solutions.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                {latestCodesRoadMapLinkJSON.map((item) => (
                  <a
                    href={"https://" + item.link}
                    key={item.codesRoadMapLinksId}
                    download
                  >
                    Spreadsheet to download containing the roadmap
                  </a>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                <b>Where to find out more</b>
                <p> ** </p>
                <p>
                  If you want to know more about the roadmap purpose and
                  process,{" "}
                  <a href={wikiPage} target="_blank" rel="noreferrer">
                    visit the Wiki page here.
                  </a>
                </p>
                <p>
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
              </td>
            </tr>
          </tbody>
        </table>
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
