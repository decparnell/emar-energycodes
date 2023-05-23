import Link from "next/link";
import styles from "../../styles/landing.module.css";
import Head from "next/head";
function Landing() {
  const LandingButton = (title, maintext, hrefLink) => {
    return (
      <Link href={String(hrefLink)} className={styles.landingButtonLink}>
        <div className={styles.landingButton}>
          <h2>{title}</h2>
          <p>{maintext}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Landing</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h1>Welcome to the Energy Market Architecture Repository (EMAR)</h1>
      <div className={styles.landingButtons}>
        {LandingButton(
          "Digital Navigator",
          "A simplified view of the codes schedules and the Data specification",
          "/"
        )}
        {LandingButton(
          "IBM Jazz",
          "The original detailed view of the codes schedules, and the data specification, with the added ability to run reports, view market scenarios and more",
          "https://emar.energycodes.co.uk/rm/web#action=com.ibm.rdm.web.pages.showFoundationProjectDashboard&componentURI=https%3A%2F%2Femar.energycodes.co.uk%2Frm%2Frm-projects%2F_Xqe2IFBPEeuGWeSXvTEFcQ%2Fcomponents%2F_XwleIFBPEeuGWeSXvTEFcQ"
        )}
      </div>
    </div>
  );
}

export default Landing;
