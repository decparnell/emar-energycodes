import AppContext from "../context/AppContext";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";

export const VersionDropdown = () => {
  const router = useRouter();
  const { version } = router.query;
  const value = useContext(AppContext);
  let { latestDataSpecVersion, allDataSpecVersions } = value.state;

  const handleDropdownSelect = (option) => {
    console.log(allDataSpecVersions);
    if (window) {
      sessionStorage.setItem("version", option);
      value.setLatestDataSpecVersion(sessionStorage.getItem("version"));
      if (option != version) {
        const query = router.query;
        query.version = option;
        router.push(
          {
            pathname: router.pathname,
            query: query,
          },
          { shallow: false }
        );
      }
    }
    setDropdownOpen((current) => !current);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {latestDataSpecVersion}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {allDataSpecVersions.map((version) => (
          <Dropdown.Item
            onClick={() => handleDropdownSelect(version.versionNumber)}
          >
            {version.versionNumber - version.status}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
