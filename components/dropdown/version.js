import AppContext from "../context/AppContext";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const VersionDropdown = () => {
  const value = useContext(AppContext);
  let { latestDataSpecVersion, allDataSpecVersions } = value.state;
  const setVersion = value.setLatestDataSpecVersion;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {latestDataSpecVersion}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {allDataSpecVersions.map((version) => (
          <Dropdown.Item onClick={setVersion(version.versionNumber)}>
            {version.versionNumber - version.status}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
