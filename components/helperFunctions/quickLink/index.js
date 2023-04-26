import styles from "../../../styles/quickLink.module.css";
import Link from "next/link";

function QuickLink(props) {
  return (
    <Link href={props.link}>
      <div className={` ${styles.quickLink} box`}>
        {props.title}
        <div className={styles.image}>{props.image}</div>
      </div>
    </Link>
  );
}

export default QuickLink;
