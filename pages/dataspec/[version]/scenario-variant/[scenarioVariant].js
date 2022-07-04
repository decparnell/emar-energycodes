import { useRouter } from "next/router";
import CreateFlowStructure from "../../../../components/dataspec/createFlowStructure";
import styles from "../../../../styles/dataspec.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";

function ScenarioPage({ scenarioVariantInfo, structure }) {
  const svInfo = scenarioVariantInfo[0];
  const router = useRouter();
  const scenarioVariant = router.query.scenarioVariant;

  return (
    <>
      <h1>{scenarioVariant}</h1>
      <table>
        <tr>
          <td className={styles.tableHearSide}>Name</td>
          <td>{svInfo.EnergyMarketMessageScenarioVariantName}</td>
        </tr>
        <tr>
          <td className={styles.tableHearSide}>Description</td>
          <td>{svInfo.EnergyMarketMessageScenarioVariantDescription}</td>
        </tr>
        <tr>
          <td className={styles.tableHearSide}>Owner</td>
          <td>{svInfo.OwnerName}</td>
        </tr>
      </table>
      <div className={styles.sourcetargetContainer}>
        <div className={styles.source}>
          <p>{svInfo.SourceName}</p>
        </div>
        <AiOutlineArrowRight className={styles.sourceArrowTarget} />
        <div className={styles.target}>
          <p>{svInfo.TargetName}</p>
        </div>
      </div>
      {CreateFlowStructure(structure)}
    </>
  );
}

export default ScenarioPage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-24.uksouth.logic.azure.com/workflows/745e02a8a89c49caa6ebf5ee4d3102ab/triggers/manual/paths/invoke/scenarioVariant/${context.params.scenarioVariant}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U4fk5dXXgeeHE5VbPydGMyA7ZUobST6KOGviXAwyuIg`
  );
  const dataJson = await dataReq.json();
  const scenarioVariantInfo = dataJson.scenarioVariantInfo;
  const structure = dataJson.structure;

  // Pass data to the page via props
  return { props: { scenarioVariantInfo, structure } };
}
