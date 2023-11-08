import styles from "../styles/error.module.css";
function Error(props) {
  const statusCode = props.statusCode;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="/recco_logo.png"
          alt="recco_logo"
          className={`${styles.lightbulb} ${styles.animated}`}
        />
        <h1 className={styles.animated}>Oops! Something went wrong.</h1>
        <p className={styles.animated}>
          We seem to have misplaced the electricity and gas!
        </p>
        <p className={`${styles.animated}`}>Error Code: {statusCode}</p>
        <p className={styles.animated}>
          Don't worry, our hamster-powered servers are on the case.
        </p>
      </div>
    </div>
  );
}

export default Error;
