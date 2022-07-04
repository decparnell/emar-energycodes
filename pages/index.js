import styles from "../styles/home.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Anouncements</h3>
        <ul>
          <li>EMAR Proof of Concept</li>
        </ul>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Release Notes</h3>
        <ul>
          <li>This is what EMAR could look like going forward</li>
        </ul>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Data Spec Pre-Release</h3>
        <ul>
          <li>HTML Data Specification brought into a cohesive site</li>
        </ul>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.contentTitle}>Codes Schedules Pre-Release</h3>
        <ul>
          <li>Codes Schedule viewer updated</li>
          <li>Change viewer updated</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
