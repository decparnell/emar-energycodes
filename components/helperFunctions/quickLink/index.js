import styles from "../../../styles/quickLink.module.css";
import Link from "next/link";

function QuickLink(props) {
  //props
  //title = text to display at teh top of the link (string)
  //link = where to redirect to
  //image = react icons object to display under the text
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