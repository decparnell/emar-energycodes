import Image from "next/image";
// import logo from "./recco_logo.PNG";
import reccoLogo from "./RECCOLogoWhiteAsset13.png";
import Link from "next/link";
import { Fragment } from "react";
import styles from "../../styles/header.module.css";
import { FaBars } from "react-icons/fa";
import AsideDropDownMenu from "../AsideDropDownMenu";

function navbar() {
  const meniuItems = ["Home"];
  //<div className="navLink">
  //<Link href="/rec-portal">REC Portal</Link>
  //</div>
  return (
    <Fragment>
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            <Image alt="Recco logo" src={reccoLogo} />
          </div>
        </Link>
        <div>
          <AsideDropDownMenu meniuItems={meniuItems} />
        </div>
      </div>
    </Fragment>
  );
}

export default navbar;
