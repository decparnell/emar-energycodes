import Calendar from "../../components/calendar/calendar";
import styles from "../../styles/recportal.module.css";
import LinkTextFromDefinitions from "../../components/helperFunctions/linkTextFromDefinitions";

const loginSSO =
  "PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIElEPSJfYjQwZTNlOTMtMTU2MS00NWVlLThlYTktOGIxNTNkOWE4MzU1IiBJblJlc3BvbnNlVG89Il80ODQ5ZGFmNDc5NTRiYzc4MmQ4ZDM0OTcyYjEyYzU3NGMxZGIyZGJjMWYiIFZlcnNpb249IjIuMCIgSXNzdWVJbnN0YW50PSIyMDIyLTExLTE0VDEwOjU2OjE5LjY1MTg3NzVaIiBEZXN0aW5hdGlvbj0iaHR0cHM6Ly9lbWFyLWVuZXJneWNvZGVzLmF6dXJld2Vic2l0ZXMubmV0L2Fzc2VydCIgeG1sbnM6c2FtbHA9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpwcm90b2NvbCI+PHNhbWw6SXNzdWVyIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOm5hbWVpZC1mb3JtYXQ6ZW50aXR5Ij5odHRwczovL3JlY21hbmFnZXJkZXZiMmNiMmNsb2dpbi5jb20vQjJDXzFBX3NpZ251cF9zaWduaW5fc2FtbDwvc2FtbDpJc3N1ZXI+PFNpZ25hdHVyZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+PFNpZ25lZEluZm8+PENhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiIC8+PFNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIgLz48UmVmZXJlbmNlIFVSST0iI19iNDBlM2U5My0xNTYxLTQ1ZWUtOGVhOS04YjE1M2Q5YTgzNTUiPjxUcmFuc2Zvcm1zPjxUcmFuc2Zvcm0gQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjZW52ZWxvcGVkLXNpZ25hdHVyZSIgLz48VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIj48SW5jbHVzaXZlTmFtZXNwYWNlcyBQcmVmaXhMaXN0PSJzYW1sIHNhbWxwIHhlbmMgeHMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiIC8+PC9UcmFuc2Zvcm0+PC9UcmFuc2Zvcm1zPjxEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIgLz48RGlnZXN0VmFsdWU+dmRITHNaV2JJTk1Cd20rTWl4Q2NmcnZ4Y0pvPTwvRGlnZXN0VmFsdWU+PC9SZWZlcmVuY2U+PC9TaWduZWRJbmZvPjxTaWduYXR1cmVWYWx1ZT5BdDVadkFJVDd4RG4xOWlPdlFIZE1sSHVVQ2Q3QWN1aUJSa1RGdERsd1dEeWFYcWtNY2lVd2plT0t5cXhnVzEra1BNd0tJdU0zL2tYbVRRSzNKTUxTKzZiZ1N4NXJpRmNjM1NiTE1HRWRFUHlST0xUSE8zVUxTNldzSHFCZFV1QU8vM0Z4OTYxajV2SVJtZ2dNL2JrU3U1NHppZStiWEhRNmdhaDZxb1FTZ1NVZkcweXREQVp5alpOYXcwekl5b3M2WUlHN09EU0dKZjBVdzNlWlNMTVk2cjFFYlBoV1FJUHhwbUkyWWNySzV0dUlNRnRUR3IyU1hLREdEK2ZwdlZmc3gwcXhqNFQyRUFpSFo2YjN0anY1S0dnNUpNdzE3QTJIWXZXaDJXZWRYeGlPNFB2aGd5amE3OC81QXM5SmVaRmszRmlPektjbFpRd1kvYm1lNlFWSHc9PTwvU2lnbmF0dXJlVmFsdWU+PEtleUluZm8+PFg1MDlEYXRhPjxYNTA5Q2VydGlmaWNhdGU+TUlJRE1EQ0NBaGlnQXdJQkFnSVFHWi9lSEFWWThydEw4VFk0bktNRFF6QU5CZ2txaGtpRzl3MEJBUXNGQURBck1Ta3dKd1lEVlFRRERDQnlaV050WVc1aFoyVnlaR1YyWWpKakxtOXViV2xqY205emIyWjBMbU52YlRBZUZ3MHlNakExTURRd09USTBORFJhRncweU16QTFNRFF3T1RNME5ETmFNQ3N4S1RBbkJnTlZCQU1NSUhKbFkyMWhibUZuWlhKa1pYWmlNbU11YjI1dGFXTnliM052Wm5RdVkyOXRNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXNteDRQa3J2K2hldDNZN0UxNTlFc0owd3hjTW03R3dqMGZXQktGeGlOaERLa2FhM2J5T1N4V09GRTFkUmxnQXhqYUJmZ2NLaHFzMVNkUmVOcjgxWTBPc09qWVZDK0xuQXJmVW1DL3ZaajVEZHRPWmV0b1R4UDFnaGQvR1FoZGxJam9DTFNoSVEvck5DVGtrd2lHOE84SytVQ0pjaUh3dlBWSmlhUzZ2L29TLzA0MEwySlJldlJvZlZ0S29WMU9TNHppMFBONDQ5SnEvV3VwOWQzUEFxNHo0SFg1d3ltZXByQ2xXTGtzTW11RkxuaGVvMk16dENEZ05vdEFHakwxcHMxM1kvbG5iQUw4V2xkL2c2dmZselIxZDE3U1RGSkVOMkdtUzdzZy9ScEdkaFk2czZWemVLRTBtY2Jkd2NaVGQwTkpSb01XU25ZKzRvRDdOSUJER0p4UUlEQVFBQm8xQXdUakFPQmdOVkhROEJBZjhFQkFNQ0I0QXdIUVlEVlIwbEJCWXdGQVlJS3dZQkJRVUhBd0lHQ0NzR0FRVUZCd01CTUIwR0ExVWREZ1FXQkJTWVVkU0VaeXIrT2I0ZEw2OXZLcHhSREEwT1hqQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFHQ2NxeXNOVml0TGViZS9OOW1sUHRST2JTZytSaVdFeGxKYlp6Y0F5alhBcy9tOXFabEhaYnJBL0hTMUE2WUk3WjhSb1V6ZFl0c2Z0OG5QQUlnSWg5em1nS2VCaGZXZHJvVnl2cnVSMElvcEg4cE1sQ2RmSmxmZWJjNXJkRXFJSEtuYU9kMERESG1wb0tLVFRQSzV0SC9TQkd0K0lHMjlJTGlmQ1ZTdVM0SDZTOTRLOUZDSXAzQTdZWXJ2cERsdUhkTHBGMU8vUC9nSHdzTmNObjlxRFJTNlljR2h6S1JudnlTVG1tVUJ2TWNrdU1GaUMzcmtyOFJXaXEwZkxMY0ovKzJ6MldJQjhUVzc5TlY5bktTemJaa3c4QnI0ZFFBVlZrSktuR0RLRTRFRUE5U0cyQkxTK2pDQW9SRDVKcG44WkFBQjZEWi9RMVBpbHdCUkRjR01SakE9PTwvWDUwOUNlcnRpZmljYXRlPjwvWDUwOURhdGE+PC9LZXlJbmZvPjwvU2lnbmF0dXJlPjxzYW1scDpTdGF0dXM+PHNhbWxwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIgLz48L3NhbWxwOlN0YXR1cz48c2FtbDpBc3NlcnRpb24gSUQ9Il82NWMxMmExNy05ZWUzLTQ2MDMtOTQ2NC1mZjAxZWE5NGM1OGQiIFZlcnNpb249IjIuMCIgSXNzdWVJbnN0YW50PSIyMDIyLTExLTE0VDEwOjU2OjE5LjU3Mzc0NloiPjxzYW1sOklzc3VlciBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSI+aHR0cHM6Ly9yZWNtYW5hZ2VyZGV2YjJjYjJjbG9naW4uY29tL0IyQ18xQV9zaWdudXBfc2lnbmluX3NhbWw8L3NhbWw6SXNzdWVyPjxzYW1sOlN1YmplY3Q+PHNhbWw6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6ZW1haWxBZGRyZXNzIj5kZWMucGFybmVsbEBjYXBnZW1pbmkuY29tPC9zYW1sOk5hbWVJRD48c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmNtOmJlYXJlciI+PHNhbWw6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgTm90T25PckFmdGVyPSIyMDIyLTExLTE0VDExOjAxOjE5LjU3Mzc0NloiIFJlY2lwaWVudD0iaHR0cHM6Ly9lbWFyLWVuZXJneWNvZGVzLmF6dXJld2Vic2l0ZXMubmV0L2Fzc2VydCIgSW5SZXNwb25zZVRvPSJfNDg0OWRhZjQ3OTU0YmM3ODJkOGQzNDk3MmIxMmM1NzRjMWRiMmRiYzFmIiAvPjwvc2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uPjwvc2FtbDpTdWJqZWN0PjxzYW1sOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDIyLTExLTE0VDEwOjU2OjE5LjU3Mzc0NloiIE5vdE9uT3JBZnRlcj0iMjAyMi0xMS0xNFQxMTowMToxOS41NzM3NDZaIj48c2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPjxzYW1sOkF1ZGllbmNlPmh0dHBzOi8vZW1hci5lbmVyZ3ljb2Rlcy5jby51ay9yZWNkbi9zYW1sMjAvZGVmYXVsdFNQPC9zYW1sOkF1ZGllbmNlPjwvc2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDpDb25kaXRpb25zPjxzYW1sOkF1dGhuU3RhdGVtZW50IFNlc3Npb25JbmRleD0iOGE2ZDk5OTMtNmQ5MC00ZGZhLWI0OGYtY2IwZGQ1NWYyYzIwIiBBdXRobkluc3RhbnQ9IjIwMjItMTEtMTRUMTA6NTY6MTkuNTczNzQ2WiI+PHNhbWw6QXV0aG5Db250ZXh0PjxzYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOnVuc3BlY2lmaWVkPC9zYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDpBdXRobkNvbnRleHQ+PC9zYW1sOkF1dGhuU3RhdGVtZW50PjxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudCB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJEaXNwbGF5TmFtZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDpiYXNpYyIgRnJpZW5kbHlOYW1lPSJEaXNwbGF5IE5hbWUiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPkRlYyBUZXN0PC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9IkdpdmVuTmFtZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDpiYXNpYyIgRnJpZW5kbHlOYW1lPSJHaXZlbiBOYW1lIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5EZWM8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iU3VybmFtZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDpiYXNpYyIgRnJpZW5kbHlOYW1lPSJTdXJuYW1lIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5UZXN0PC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9ImVtYWlsIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIiBGcmllbmRseU5hbWU9IkVtYWlsIEFkZHJlc3MiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPmRlYy5wYXJuZWxsQGNhcGdlbWluaS5jb208L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0ib2JqZWN0SWQiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6YmFzaWMiIEZyaWVuZGx5TmFtZT0iVXNlcidzIE9iamVjdCBJRCI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOnN0cmluZyI+YzMxNmM0YTYtNmRlOS00NTg1LTk2YmQtODVlZWMwZGQ1NWQ3PC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9ImlzRm9yZ290UGFzc3dvcmQiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6YmFzaWMiIEZyaWVuZGx5TmFtZT0iaXNGb3Jnb3RQYXNzd29yZCI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOmJvb2xlYW4iPmZhbHNlPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PC9zYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD48L3NhbWw6QXNzZXJ0aW9uPjwvc2FtbHA6UmVzcG9uc2U+";
let buff = new Buffer(loginSSO, "base64");
let text = buff.toString("ascii");

const recPortalLinks = [
  {
    name: "REC Documents",
    link: "https://recportal.co.uk/rec-documents-public-",
    group: "rec_info",
  },
  {
    name: "REC News",
    link: "https://recportal.co.uk/rec-news",
    group: "rec_info",
  },
  {
    name: "User Guide & Operational Doccumets",
    link: "https://recportal.co.uk/category-3-products",
    group: "rec_info",
  },
  {
    name: "FAQs for Customers",
    link: "https://recportal.co.uk/documents/20121/12364247/FAQs+for+Consumers.pdf/7a53c14d-076c-9542-3938-16d0aa23101a?t=1636024847732",
    group: "rec_info",
  },
  {
    name: "Smart Meter Installation Schedule (SMIS)",
    link: "https://recportal.co.uk/smicop",
    group: "rec_info",
  },
  {
    name: "Central Switching Service Development Portal",
    link: "https://devportal.centralswitchingservice.co.uk/signin?ReturnUrl=%2F",
    group: "rec_services",
  },
  {
    name: "Electricity Enquiry Service",
    link: "https://www.ecoes.co.uk/",
    group: "rec_services",
  },
  {
    name: "Green Deal Central Charge Database",
    link: "https://www.gdccportal.com/Pages/Account/Login.aspx",
    group: "rec_services",
  },
];

const definitions = [
  {
    linkText: "REC Performance Assurance Board",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Centralised Registration Service",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "REC Service Provider",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "REC Service User",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "REC Service",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "CRS Provider",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Change Panel",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Sub-Committee",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "REC Board",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "RECCo",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
  {
    linkText: "Code",
    componentText: "really",
    linkForwardUrl: 1,
    linkType: "definition",
  },
];

function RecPortal() {
  const recinformation = recPortalLinks.filter(
    (link) => link.group == "rec_info"
  );
  const recservices = recPortalLinks.filter(
    (link) => link.group == "rec_services"
  );
  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <Calendar />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.informationTitle}>REC Information</h3>
        <ul>
          {recinformation.map((link, index) => (
            <li key={index}>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.infoContainer}>
        <h3 className={styles.informationTitle}>Access to REC Services</h3>
        <ul>
          {recservices.map((link, index) => (
            <li key={index}>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.dectest}>
        {LinkTextFromDefinitions(
          "The Change Panel and the REC Performance Assurance Board are Sub-Committees. The REC Board shall, at a time it considers appropriate, establish the Change Panel and the REC Performance Assurance Board. Until those Sub-Committees have been established, the functions, duties and powers assigned to them under this Code shall be performed and exercised by the REC Board.",
          definitions
        )}
      </div>
    </div>
  );
}

export default RecPortal;
