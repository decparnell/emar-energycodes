import { useContext } from "react";
import AppContext from "../../context/AppContext";

export async function fetchVersionMapping(
  latestDataSpecVersion
) {
  const bodyData = JSON.stringify({ recVersion: latestDataSpecVersion });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  try {
    const response = await fetch("/api/versionMapping", options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching Version Mapping:", error);
  }
}

export async function FetchRecVersions() {
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;
  try {
    const response = await fetch("/api/recVersions");
    const data = await response.json();
    value.setAllDataSpecVersions(data);
    value.setLatestDataSpecVersion(
      recVersions.filter((version) => version.status === "Live")[0]?.name || ""
    );
    //setLatestDataSpecVersion(allDataSpecVersions.filter((version) => version.status === "Live")[0].name);
  } catch (error) {
    console.error("Error fetching recVersions:", error);
  } finally {

    fetchVersionMapping(latestDataSpecVersion).then((data) => {
      value.setCurrentVersionMapping(data);
    }).catch((error) => {
      console.error("Error Fetching Version Mapping:", error);
    });

    value.setLoading(false);
  }
}
