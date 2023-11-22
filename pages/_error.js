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
          Seems like we have ran out of electricity in the office... Don't
          worry, our hamster-powered servers are on the case.
        </p>
        <p className={`${styles.animated}`}>Error Code: {statusCode}</p>
        <p className={styles.animated}>
          Please refresh your browser, and if the issue persists{" "}
          <a href="mailto:enquiries@recmanager.co.uk?subject=Error On Digital Navigator">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}

export default Error;
