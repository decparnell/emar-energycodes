import Link from "next/link";
import styles from "../../styles/landing.module.css";
import Head from "next/head";
import { LogUserInfo } from "../../components/logging";
import { useEffect } from "react";
function Landing() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Landing</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anom</td>
            <td>19</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
          </tr>
          <tr>
            <td>Subham</td>
            <td>25</td>
            <td>Male</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Landing;
