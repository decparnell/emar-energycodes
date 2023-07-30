import { BiSearchAlt2 } from "react-icons/bi";
import styles from "../../styles/quickLink.module.css";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";
export default function DashboardSearch(props) {
  const searchType = props.searchType;

  const searchFunction = props.searchFunction;

  const searchLink = props.searchLink;

  const value = useContext(AppContext);
  let { searchValue } = value.state;

  const onChangeFunction = (e) => {
    value.setSearchValue(e.target.value);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push(searchLink);
  };

  const search = (
    <BiSearchAlt2
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );

  const pressEnterHandler = (event) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={` ${styles.search} box`}>
      <Link href={searchLink}>
        <div className={`boxTitle ${styles.boxTitle}`}>{searchType} Search</div>
      </Link>
      <div className={styles.searchForm}>
        <input
          className={`${styles.input}`}
          placeholder={`Search the ${searchType}`}
          name="Question box"
          rows="3"
          wrap="soft"
          onChange={onChangeFunction}
          //value={searchValue}
          onKeyDown={pressEnterHandler}
        />
        <div
          className={`${styles.button}`}
          disabled={false}
          onClick={handleClick}
        >
          {search}
        </div>
      </div>
      {/* <div className={styles.searchImage}>{search}</div> */}
    </div>
  );
}
