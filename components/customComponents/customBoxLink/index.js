
import styles from "../../../styles/home.module.css";
import { BiRightArrow, BiSolidRightArrow } from "react-icons/bi";
import { useState } from 'react';

export const CustomBoxLink = ({ dashboardHref, id, ...otherProps }) => {
    const [isHovered, setIsHovered] = useState(false);
    const ArrowIcon = isHovered ? BiSolidRightArrow : BiRightArrow;
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <a
            href={dashboardHref}
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
        </a>
    )
}