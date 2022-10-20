import Image from "next/image";
// import logo from "./recco_logo.PNG";
import reccoLogo from "./RECCOLogoWhiteAsset13.png";
import Link from "next/link";
import { Fragment } from "react";
import styles from "../../styles/header.module.css";
import AsideDropDownMenu from "../AsideDropDownMenu";

function navbar() {
  return (
    <Fragment>
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            <Image alt="Recco logo" src={reccoLogo} />
          </div>
        </Link>
        <div>
          <AsideDropDownMenu />
        </div>
      </div>
    </Fragment>
  );
}

export default navbar;
