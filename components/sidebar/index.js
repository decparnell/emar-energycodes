import styles from "../../styles/codes.module.css";

function Sidebar({ toggleSidebar, isSidebarOpen, children }) {
  // sidebar with hamburger menu
  return (
    <aside
      className={[
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
        styles.sidebar,
      ].join(" ")}
    >
      <div className={styles.hamburger}>
        <div
          data-testid="testDiv"
          className={[isSidebarOpen ? styles.open : null, styles.burger].join(
            " "
          )}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>{children}</div>
    </aside>
  );
}

export default Sidebar;
