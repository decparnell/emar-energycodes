import { BiSearchAlt2 } from "react-icons/bi";
import styles from "../../styles/header2.module.css"
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

export default function NavBarSearch(props) {

    const value = useContext(AppContext);
    let { searchValue } = value.state;

    const router = useRouter();

    const search = (
        <BiSearchAlt2
            style={{
                height: "100%",
                width: "55%",
            }}
        />
    );

    const handleClick = () => {
       router.push(`/search-results`)
    }

    const onChangeFunction = (e) => {
        value.setSearchValue(e.target.value);
    };

    const pressEnterHandler = (event) => {
        if (event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <>
        <div className={styles.navBarSearchContainer}>
            <input
                className={styles.inputBoxNavBar}
                placeholder={`Search a term`}
                onChange={onChangeFunction}
                value={searchValue}
                onKeyDown={pressEnterHandler} 
            />
            <div className={styles.navBarSearchIcon} onClick={handleClick}>{search}</div>
        </div>
        </>
    );


}