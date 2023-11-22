import styles from "../../../styles/home.module.css";
import { BiRightArrow, BiSolidRightArrow } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";

export const CustomBoxLink = ({ href, id, ...otherProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ArrowIcon = isHovered ? BiSolidRightArrow : BiRightArrow;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={href}
      key={id}
      className={styles.dashboardItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...otherProps}
    >
      <span className={styles.arrowContainer}>
        <ArrowIcon className={styles.arrowIcon} />
      </span>
      {otherProps.children}
    </Link>
  );
};
