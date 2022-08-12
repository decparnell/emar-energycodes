import Image from "next/image";
import logo from "./recco_logo.PNG";
import Link from "next/link";
import { Fragment } from "react";
import styles from "../../styles/header.module.css";
import { AiOutlineHome } from "react-icons/ai";
function navbar() {
  //<div className="navLink">
  //<Link href="/rec-portal">REC Portal</Link>
  //</div>
  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.logo}>
          {/* <Image alt="Recco logo" src={logo} /> */}
        </div>
        <div className={styles.navLinks}>
          <div className={styles.navLink}>
            <Link href="/">
              <AiOutlineHome className={styles.homeButton} />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default navbar;
