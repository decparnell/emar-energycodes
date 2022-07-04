import Link from "next/link";
import styles from "../../styles/codes.module.css";

function CodesPage({ gov, green, metering, other, party, transition }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Governance & Misc.</h3>
        {CreateList(gov)}
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Metering</h3>
        {CreateList(metering)}
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Party Management</h3>
        {CreateList(party)}
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Green Deal & Theft</h3>
        {CreateList(green)}
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Transition to REC</h3>
        {CreateList(transition)}
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Other</h3>
        {CreateList(other)}
      </div>
    </div>
  );
}

export default CodesPage;

function CreateList(listItems) {
  return (
    <ul>
      {listItems.map((item) => (
        <li key={item.documentId} style={{ fontSize: 12 }}>
          <Link
            href={`/codes-schedules/${encodeURIComponent(
              item.documentId
            )}/${encodeURIComponent(item.versionName)}`}
          >
            {item.documentName}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps({ params }) {
  //return the info about the latest version - logic app=getLatestScheduleList-LogicApp
  const dataReq = await fetch(
    `https://prod-03.uksouth.logic.azure.com:443/workflows/e745a88e892a4cf48e9345cd4a6130dc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DKdtmwLUmXvBo3Ocxyl14G3fs5UZQBCcr5gjlDZxu4w`
  );
  const dataJson = await dataReq.json();
  const gov = dataJson.gov;
  const green = dataJson.green;
  const metering = dataJson.metering;
  const other = dataJson.other;
  const party = dataJson.party;
  const transition = dataJson.transition;
  return {
    props: { gov, green, metering, other, party, transition },
  };
}
