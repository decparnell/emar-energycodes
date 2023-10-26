//Checking to see if the data renders correctly
//Needs a check to use either contextDocuments / verifiedSources
import { LogUserInfo } from "../../logging";
export default function download(
  page = "",
  url,
  fileName,
  suffix = "",
  queryId = ""
) {
  const loggingText = `DOWNLOAD: ${fileName} ${page} ${suffix}`;
  LogUserInfo(loggingText, queryId);
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  a.target = "_blank";
  a.rel = "noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
