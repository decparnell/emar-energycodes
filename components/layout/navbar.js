import Image from "next/image";
// import logo from "./recco_logo.PNG";
import reccoLogo from "./RECCOLogoWhiteAsset13.png";
import Link from "next/link";
import { Fragment } from "react";
import styles from "../../styles/header.module.css";
import { FaBars } from "react-icons/fa";
function navbar() {
  //<div className="navLink">
  //<Link href="/rec-portal">REC Portal</Link>
  //</div>
  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image alt="Recco logo" src={reccoLogo} />
        </div>
        <div>
          <Link href="/">
            <h2 className={styles.headerText}>RECCo EMAR</h2>
          </Link>
        </div>
        <div>
          <div className={styles.navLink}>
            <Link href="/">
              <FaBars className={styles.homeButton} />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default navbar;
