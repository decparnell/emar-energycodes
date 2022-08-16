import AppContext from "../context/AppContext";
import { useContext } from "react";
import styles from "../../styles/header.module.css";
import { buttonHeaderOptions } from "../settings";

function ButtonNavbar() {
  const value = useContext(AppContext);
  let { chosenButton, chosenTab } = value.state;

  const handleClick = (id, e) => {
    e.preventDefault();
    value.setChosenButton(id);
  };

  return (
    <div className={styles.buttonHeader}>
      {buttonHeaderOptions.map((but, i) =>
        but.id == chosenButton ? (
          <button
            className={`medium_button ${styles.buttonItem} ${styles.chosenButton}`}
            key={i}
            onClick={(e) => handleClick(but.id, e)}
          >
            {but.name}
          </button>
        ) : (
          <button
            className={`medium_button ${styles.buttonItem}`}
            key={i}
            onClick={(e) => handleClick(but.id, e)}
          >
            {but.name}
          </button>
        )
      )}
    </div>
  );
}
export default ButtonNavbar;
