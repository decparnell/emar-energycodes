import styles from "../../../styles/quickLink.module.css";
import Link from "next/link";

function QuickLink(props) {
  //props
  //title = text to display at teh top of the link (string)
  //link = where to redirect to
  //image = react icons object to display under the text
  //width = width for styling
  //height
  //textStyle

  const joinedStyles = {
    width: props.width,
    height: props.height,
    ...props.textStyle,
  };
  return (
    <Link href={props.link}>
      <div className={` ${styles.quickLink} box`} style={joinedStyles}>
        {props.title}
        {props.image ? <div className={styles.image}>{props.image}</div> : null}
      </div>
    </Link>
  );
}

export default QuickLink;
