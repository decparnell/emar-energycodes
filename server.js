const next = require("next");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const got = import("got");
app.prepare().then(() => {
  var saml2 = require("saml2-js");
  var fs = require("fs");
  var express = require("express");
  var server = express();
  var cookieParser = require("cookie-parser");
  var sessions = require("express-session");
  // If you're using express <4.0:
  var bodyParser = require("body-parser");
  server.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  // creating 24 hours from milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  //session middleware
  server.use(
    sessions({
      secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
      saveUninitialized: true,
      cookie: { maxAge: oneDay },
      resave: false,
    })
  );
  // cookie parser middleware
  server.use(cookieParser());

  // a variable to save a session
  var session;
  var name;
  var session_index;
  // Production service provider
  /* var sp_options = {
    entity_id: "Recco.DigitalNavigator.Production",
    private_key:
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4J0rpnr8bv65MgnrQ1+p7iQn3FCqF+WKQmcWfCYB5m7r5uqewT8fKGQTlglaOT+xPm8e/iSrFAapSx1z3AASZzh9touMs5RvNYsyq/3nAJW9iaghqYb5u8c4M/g3SkaNdGTZH4wkSdR8FGmrfSoX+XXOwBN7lawjNF3/WURv0cPDPhS4Xi9/bLDiP3UD9HFg8SJQTCzMXAxWCSA7ab9enBzSRO7o0zBhDXzj/MQ94UqqCNdxWZ4id6i2keWPQSysM9TmN/ntutabGzEVUSBgcnAVwAEBx/1B6MgwnK48dy6boiVG9k6racZAVbBEGD3YQri+1Q86XubRsFrOHTVRFAgMBAAECggEAGLXdDYApsLWF0+pmRIPUiQMYfTkNg7C1EyYvKGoD/U1yR3ROcBAkhO/agll899eto/kJUqA7Rvg0PKtXxCUSePj5qqKCzVFo66RoRkHFuozLZ29G9c9r2ENGHOQyQqEcRK/PYtIKM5nXsb2bvZ6oYDt1/JaKukokgjC3DLERiTksC+s2ROf6WjOAcJpYpQe3eTVQ/t0coJlWY8ljNZSTKft8MeAW0ZAL3cn3fdGPh+WJN+IQ5rKuYIE/C3GE7sgkK0JtAYGycfPj0tIY/wxDaV6PZf/req3ALLnj1Qoyq1358QORaElrdyAARRT8hXJsP3TLJb5bTbKkw1+xxP88OQKBgQDKLY3B5w0ahpfZCQZ/pYuA2ju/QyJVwN2rDQ/asfDSNzNl7oTSf4kPVJ5CX5MXsRAcoHiSk9Rhei5CVIQvhknddTWjSnTqQGQLk1bhsdnXyqrplv+d+GwimL3vfYRI2X/T+cz44zgLE3StkFKBD/uQBqfqux8RYO9r6xzA7KN23wKBgQDpLV7RjLX8hOhePifSTXuiUPfdmS2jltTO+UW9iGSu9i8I/f9e5csdfVfWFXwo/chQl2lPU7uztcO75mLEJUtVS6KzjRvhEjAiqWrqJqxcOAi5b9/QGme4m9GZdmroQG9NDW7IpHqa7dZNNVunwt+f4sC8QeMI5oEV2cA3hK9NWwKBgGJvM2mIuNSFW0EMJ+HWE8m0dwp0AS+HK2WwgluT7xAqWBf0vS5PccfJBxSBu/f4+UM2zf1vhCPBfOxGgeUxmJz+CBNsmOfEWfFY1yAjm1B5GCWKowGiheOCQldr4RAm9RmbsbQrzIl3+4LVlZXI1k4VL4QVftbTPz5nxiQYEq45AoGAGNS3CzOj0Z9Jq3eNAA02REPBEX0Vah1OzjenYJacujEHMzrxLebkqWBGsUqabTcRVNu64DK3g1yw2lqfW+noys2CJwK43E/2hkpqU0MJCc0ByNWMDPoy32rgeCovGkp6T8dFa+JwF/2J27D58LSE4d7gzWtqxPDfADevC3p6vI8CgYEAtegmCq6bTL6D8haP0j3t+qdjNTJlZoVlepJlpCPZiIRgdVj4T6fk1Ye1EdGuKSq2LlfBQENLu5JugwPmXRXqnvNkfyBypdHTiZtHHD9J1z5b56Z4kMsJDzG0lgE1O4TdnVAqExumhbe5Y7GpDjva3QRTBPhy4DUo0ZmCWRhzIhY=",
    certificate:
      "MIIDRDCCAiygAwIBAgIQQLvOYPT2TVmvIS0m+OdcfDANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDDBRSZWNfRGlnaXRhbE5hdmlnYXRvcjAeFw0yMjEwMDUwODU2NDZaFw0zMjEwMDUwOTA2NDZaMB8xHTAbBgNVBAMMFFJlY19EaWdpdGFsTmF2aWdhdG9yMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuCdK6Z6/G7+uTIJ60Nfqe4kJ9xQqhflikJnFnwmAeZu6+bqnsE/HyhkE5YJWjk/sT5vHv4kqxQGqUsdc9wAEmc4fbaLjLOUbzWLMqv95wCVvYmoIamG+bvHODP4N0pGjXRk2R+MJEnUfBRpq30qF/l1zsATe5WsIzRd/1lEb9HDwz4UuF4vf2yw4j91A/RxYPEiUEwszFwMVgkgO2m/Xpwc0kTu6NMwYQ184/zEPeFKqgjXcVmeIneotpHlj0EsrDPU5jf57brWmxsxFVEgYHJwFcABAcf9QejIMJyuPHcum6IlRvZOq2nGQFWwRBg92EK4vtUPOl7m0bBazh01URQIDAQABo3wwejAOBgNVHQ8BAf8EBAMCBaAwCQYDVR0TBAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwHwYDVR0jBBgwFoAU4n9m20aXwIrxA2LncVHg23bUn/wwHQYDVR0OBBYEFOJ/ZttGl8CK8QNi53FR4Nt21J/8MA0GCSqGSIb3DQEBCwUAA4IBAQBwUnJYrr1Khu7RetYy649lKn02PjzThuZZXE+0ClJys5NGDW0rdjk//8LSZSe8cpUtY38kc45LQUrtu3V2LsrVHafdj4an1+0jFNBc4d6cqCiuoSx62c9q0JAJkeFv4YvgQHI8oA0wPghi3uIQ7o08Qm4gCuE/wbS6dYT692sM3NX8FE+mhPPBFfozJtJOUaj1pTymR9eNmLqMC8d9GDuFQe+crXQWCI+MNClGL+gIdBbLq5yP+lvaDKnzAdI5U5g2965kBK9f71ekRo2X2E+OVZhjPjdwqKM3kSPS3wiJ31uT3CUAkTgFspShvcXHFAtlgqzzb1Ql9kYYys0z31SU",
    assert_endpoint: "https://digital-navigator.azurewebsites.net/assert",
    sign_get_request: true,
    allow_unencrypted_assertion: true,
  }; */
  //Test Service provider
  var sp_options = {
    entity_id: "Recco.DigitalNavigator.Test",
    private_key:
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4J0rpnr8bv65MgnrQ1+p7iQn3FCqF+WKQmcWfCYB5m7r5uqewT8fKGQTlglaOT+xPm8e/iSrFAapSx1z3AASZzh9touMs5RvNYsyq/3nAJW9iaghqYb5u8c4M/g3SkaNdGTZH4wkSdR8FGmrfSoX+XXOwBN7lawjNF3/WURv0cPDPhS4Xi9/bLDiP3UD9HFg8SJQTCzMXAxWCSA7ab9enBzSRO7o0zBhDXzj/MQ94UqqCNdxWZ4id6i2keWPQSysM9TmN/ntutabGzEVUSBgcnAVwAEBx/1B6MgwnK48dy6boiVG9k6racZAVbBEGD3YQri+1Q86XubRsFrOHTVRFAgMBAAECggEAGLXdDYApsLWF0+pmRIPUiQMYfTkNg7C1EyYvKGoD/U1yR3ROcBAkhO/agll899eto/kJUqA7Rvg0PKtXxCUSePj5qqKCzVFo66RoRkHFuozLZ29G9c9r2ENGHOQyQqEcRK/PYtIKM5nXsb2bvZ6oYDt1/JaKukokgjC3DLERiTksC+s2ROf6WjOAcJpYpQe3eTVQ/t0coJlWY8ljNZSTKft8MeAW0ZAL3cn3fdGPh+WJN+IQ5rKuYIE/C3GE7sgkK0JtAYGycfPj0tIY/wxDaV6PZf/req3ALLnj1Qoyq1358QORaElrdyAARRT8hXJsP3TLJb5bTbKkw1+xxP88OQKBgQDKLY3B5w0ahpfZCQZ/pYuA2ju/QyJVwN2rDQ/asfDSNzNl7oTSf4kPVJ5CX5MXsRAcoHiSk9Rhei5CVIQvhknddTWjSnTqQGQLk1bhsdnXyqrplv+d+GwimL3vfYRI2X/T+cz44zgLE3StkFKBD/uQBqfqux8RYO9r6xzA7KN23wKBgQDpLV7RjLX8hOhePifSTXuiUPfdmS2jltTO+UW9iGSu9i8I/f9e5csdfVfWFXwo/chQl2lPU7uztcO75mLEJUtVS6KzjRvhEjAiqWrqJqxcOAi5b9/QGme4m9GZdmroQG9NDW7IpHqa7dZNNVunwt+f4sC8QeMI5oEV2cA3hK9NWwKBgGJvM2mIuNSFW0EMJ+HWE8m0dwp0AS+HK2WwgluT7xAqWBf0vS5PccfJBxSBu/f4+UM2zf1vhCPBfOxGgeUxmJz+CBNsmOfEWfFY1yAjm1B5GCWKowGiheOCQldr4RAm9RmbsbQrzIl3+4LVlZXI1k4VL4QVftbTPz5nxiQYEq45AoGAGNS3CzOj0Z9Jq3eNAA02REPBEX0Vah1OzjenYJacujEHMzrxLebkqWBGsUqabTcRVNu64DK3g1yw2lqfW+noys2CJwK43E/2hkpqU0MJCc0ByNWMDPoy32rgeCovGkp6T8dFa+JwF/2J27D58LSE4d7gzWtqxPDfADevC3p6vI8CgYEAtegmCq6bTL6D8haP0j3t+qdjNTJlZoVlepJlpCPZiIRgdVj4T6fk1Ye1EdGuKSq2LlfBQENLu5JugwPmXRXqnvNkfyBypdHTiZtHHD9J1z5b56Z4kMsJDzG0lgE1O4TdnVAqExumhbe5Y7GpDjva3QRTBPhy4DUo0ZmCWRhzIhY=",
    certificate:
      "MIIDRDCCAiygAwIBAgIQQLvOYPT2TVmvIS0m+OdcfDANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDDBRSZWNfRGlnaXRhbE5hdmlnYXRvcjAeFw0yMjEwMDUwODU2NDZaFw0zMjEwMDUwOTA2NDZaMB8xHTAbBgNVBAMMFFJlY19EaWdpdGFsTmF2aWdhdG9yMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuCdK6Z6/G7+uTIJ60Nfqe4kJ9xQqhflikJnFnwmAeZu6+bqnsE/HyhkE5YJWjk/sT5vHv4kqxQGqUsdc9wAEmc4fbaLjLOUbzWLMqv95wCVvYmoIamG+bvHODP4N0pGjXRk2R+MJEnUfBRpq30qF/l1zsATe5WsIzRd/1lEb9HDwz4UuF4vf2yw4j91A/RxYPEiUEwszFwMVgkgO2m/Xpwc0kTu6NMwYQ184/zEPeFKqgjXcVmeIneotpHlj0EsrDPU5jf57brWmxsxFVEgYHJwFcABAcf9QejIMJyuPHcum6IlRvZOq2nGQFWwRBg92EK4vtUPOl7m0bBazh01URQIDAQABo3wwejAOBgNVHQ8BAf8EBAMCBaAwCQYDVR0TBAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwHwYDVR0jBBgwFoAU4n9m20aXwIrxA2LncVHg23bUn/wwHQYDVR0OBBYEFOJ/ZttGl8CK8QNi53FR4Nt21J/8MA0GCSqGSIb3DQEBCwUAA4IBAQBwUnJYrr1Khu7RetYy649lKn02PjzThuZZXE+0ClJys5NGDW0rdjk//8LSZSe8cpUtY38kc45LQUrtu3V2LsrVHafdj4an1+0jFNBc4d6cqCiuoSx62c9q0JAJkeFv4YvgQHI8oA0wPghi3uIQ7o08Qm4gCuE/wbS6dYT692sM3NX8FE+mhPPBFfozJtJOUaj1pTymR9eNmLqMC8d9GDuFQe+crXQWCI+MNClGL+gIdBbLq5yP+lvaDKnzAdI5U5g2965kBK9f71ekRo2X2E+OVZhjPjdwqKM3kSPS3wiJ31uT3CUAkTgFspShvcXHFAtlgqzzb1Ql9kYYys0z31SU",
    assert_endpoint: "https://emar-energycodes.azurewebsites.net/assert",
    sign_get_request: true,
    allow_unencrypted_assertion: true,
  };
  //Dev Service provider
  /* var sp_options = {
    entity_id: "Recco.DigitalNavigator.Dev",
    private_key:
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4J0rpnr8bv65MgnrQ1+p7iQn3FCqF+WKQmcWfCYB5m7r5uqewT8fKGQTlglaOT+xPm8e/iSrFAapSx1z3AASZzh9touMs5RvNYsyq/3nAJW9iaghqYb5u8c4M/g3SkaNdGTZH4wkSdR8FGmrfSoX+XXOwBN7lawjNF3/WURv0cPDPhS4Xi9/bLDiP3UD9HFg8SJQTCzMXAxWCSA7ab9enBzSRO7o0zBhDXzj/MQ94UqqCNdxWZ4id6i2keWPQSysM9TmN/ntutabGzEVUSBgcnAVwAEBx/1B6MgwnK48dy6boiVG9k6racZAVbBEGD3YQri+1Q86XubRsFrOHTVRFAgMBAAECggEAGLXdDYApsLWF0+pmRIPUiQMYfTkNg7C1EyYvKGoD/U1yR3ROcBAkhO/agll899eto/kJUqA7Rvg0PKtXxCUSePj5qqKCzVFo66RoRkHFuozLZ29G9c9r2ENGHOQyQqEcRK/PYtIKM5nXsb2bvZ6oYDt1/JaKukokgjC3DLERiTksC+s2ROf6WjOAcJpYpQe3eTVQ/t0coJlWY8ljNZSTKft8MeAW0ZAL3cn3fdGPh+WJN+IQ5rKuYIE/C3GE7sgkK0JtAYGycfPj0tIY/wxDaV6PZf/req3ALLnj1Qoyq1358QORaElrdyAARRT8hXJsP3TLJb5bTbKkw1+xxP88OQKBgQDKLY3B5w0ahpfZCQZ/pYuA2ju/QyJVwN2rDQ/asfDSNzNl7oTSf4kPVJ5CX5MXsRAcoHiSk9Rhei5CVIQvhknddTWjSnTqQGQLk1bhsdnXyqrplv+d+GwimL3vfYRI2X/T+cz44zgLE3StkFKBD/uQBqfqux8RYO9r6xzA7KN23wKBgQDpLV7RjLX8hOhePifSTXuiUPfdmS2jltTO+UW9iGSu9i8I/f9e5csdfVfWFXwo/chQl2lPU7uztcO75mLEJUtVS6KzjRvhEjAiqWrqJqxcOAi5b9/QGme4m9GZdmroQG9NDW7IpHqa7dZNNVunwt+f4sC8QeMI5oEV2cA3hK9NWwKBgGJvM2mIuNSFW0EMJ+HWE8m0dwp0AS+HK2WwgluT7xAqWBf0vS5PccfJBxSBu/f4+UM2zf1vhCPBfOxGgeUxmJz+CBNsmOfEWfFY1yAjm1B5GCWKowGiheOCQldr4RAm9RmbsbQrzIl3+4LVlZXI1k4VL4QVftbTPz5nxiQYEq45AoGAGNS3CzOj0Z9Jq3eNAA02REPBEX0Vah1OzjenYJacujEHMzrxLebkqWBGsUqabTcRVNu64DK3g1yw2lqfW+noys2CJwK43E/2hkpqU0MJCc0ByNWMDPoy32rgeCovGkp6T8dFa+JwF/2J27D58LSE4d7gzWtqxPDfADevC3p6vI8CgYEAtegmCq6bTL6D8haP0j3t+qdjNTJlZoVlepJlpCPZiIRgdVj4T6fk1Ye1EdGuKSq2LlfBQENLu5JugwPmXRXqnvNkfyBypdHTiZtHHD9J1z5b56Z4kMsJDzG0lgE1O4TdnVAqExumhbe5Y7GpDjva3QRTBPhy4DUo0ZmCWRhzIhY=",
    certificate:
      "MIIDRDCCAiygAwIBAgIQQLvOYPT2TVmvIS0m+OdcfDANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDDBRSZWNfRGlnaXRhbE5hdmlnYXRvcjAeFw0yMjEwMDUwODU2NDZaFw0zMjEwMDUwOTA2NDZaMB8xHTAbBgNVBAMMFFJlY19EaWdpdGFsTmF2aWdhdG9yMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuCdK6Z6/G7+uTIJ60Nfqe4kJ9xQqhflikJnFnwmAeZu6+bqnsE/HyhkE5YJWjk/sT5vHv4kqxQGqUsdc9wAEmc4fbaLjLOUbzWLMqv95wCVvYmoIamG+bvHODP4N0pGjXRk2R+MJEnUfBRpq30qF/l1zsATe5WsIzRd/1lEb9HDwz4UuF4vf2yw4j91A/RxYPEiUEwszFwMVgkgO2m/Xpwc0kTu6NMwYQ184/zEPeFKqgjXcVmeIneotpHlj0EsrDPU5jf57brWmxsxFVEgYHJwFcABAcf9QejIMJyuPHcum6IlRvZOq2nGQFWwRBg92EK4vtUPOl7m0bBazh01URQIDAQABo3wwejAOBgNVHQ8BAf8EBAMCBaAwCQYDVR0TBAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwHwYDVR0jBBgwFoAU4n9m20aXwIrxA2LncVHg23bUn/wwHQYDVR0OBBYEFOJ/ZttGl8CK8QNi53FR4Nt21J/8MA0GCSqGSIb3DQEBCwUAA4IBAQBwUnJYrr1Khu7RetYy649lKn02PjzThuZZXE+0ClJys5NGDW0rdjk//8LSZSe8cpUtY38kc45LQUrtu3V2LsrVHafdj4an1+0jFNBc4d6cqCiuoSx62c9q0JAJkeFv4YvgQHI8oA0wPghi3uIQ7o08Qm4gCuE/wbS6dYT692sM3NX8FE+mhPPBFfozJtJOUaj1pTymR9eNmLqMC8d9GDuFQe+crXQWCI+MNClGL+gIdBbLq5yP+lvaDKnzAdI5U5g2965kBK9f71ekRo2X2E+OVZhjPjdwqKM3kSPS3wiJ31uT3CUAkTgFspShvcXHFAtlgqzzb1Ql9kYYys0z31SU",
    assert_endpoint: "https://emar-energycodes.azurewebsites.net/assert",
    sign_get_request: true,
    allow_unencrypted_assertion: true,
  }; */
  var sp = new saml2.ServiceProvider(sp_options);

  // Production identity provider
  /* var idp_options = {
    sso_login_url:
      "https://recmanagerb2c.b2clogin.com/recmanagerb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/login",
    sso_logout_url:
      "https://recmanagerb2c.b2clogin.com/recmanagerb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/logout",
    certificates:
      "MIIDKjCCAhKgAwIBAgIQLIrr7E/rda5D1H4sqEOUczANBgkqhkiG9w0BAQsFADAoMSYwJAYDVQQDDB1yZWNtYW5hZ2VyYjJjLm9ubWljcm9zb2Z0LmNvbTAeFw0yMTA2MDcwNzEyMTJaFw0yMzA2MDcwNzIyMTJaMCgxJjAkBgNVBAMMHXJlY21hbmFnZXJiMmMub25taWNyb3NvZnQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0WLTtiEB9QRrzN05rMY9osdZd1Udk8UHwR5sqVal9k2jANxYPsZj/Qcw4DE/fDUlresdvJFz3fPHgddIbE1+Nh+tkNqKBYrmqrCcpU1vb8px8p8jj+7YBWl+r4i7VC7VSm2GObpK30fIaiS5PAmHhMHQ5iHPtr8mgwgPzpXdlP9yBqwRobkRFxfGv4M2ltUKKnYwxCvZjZQQFfe/MXcbGh6C0Ipb45nAUOa2TzeHi2sdQRjHdgNR837Fic1fHUfCL560QcLVgMO+CtkLXap3hInDtIko4rmFcClojXo1K4YvGvj6DMQZ56LmJuyj+VDRCioWRIAYzBJIkyGim7lmeQIDAQABo1AwTjAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMB0GA1UdDgQWBBStOmpqfv1YPv6yf40Kd3TpmNpBPjANBgkqhkiG9w0BAQsFAAOCAQEAcvtVnLwGi+KwM59LfOAphuWjhgshXnxmmBl90GlZ9JSaghUjHEq+rr2kfsQ+uFR93rL3WGBzTZ9L6R29xJK2uJiOLasugyIzw+hctA+O2MN3QvY2/OiZTJvzhKzbMQGcHa/b8nBuMQmSekMv/9nVweWLHiRkpD6ulh/9+Lxmpdik2sjpIoUJ74uaYyQoNyQR8NymCNjAHGjt4tV/CLtgS8JyZWDsZMlhBdzNLubidtZ9Lxhbd9Dr2E1LktzMU0koO4DtAPA6/NL7H+ye4jHtsg8V+q0DXjkIi2Sm2ZBcei+JdCUrC+ntOu4yqvxmzCNjgIaEtwN9rQbXvuJ5+JEW4Q==",
  }; */
  // Test identity provider/
  var idp_options = {
    sso_login_url:
      "https://recmanagertestb2c.b2clogin.com/recmanagertestb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/login",
    sso_logout_url:
      "https://recmanagertestb2c.b2clogin.com/recmanagertestb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/logout",
    certificates:
      "MIIDMjCCAhqgAwIBAgIQXJcF4awJFZ9GjicY1TLnFTANBgkqhkiG9w0BAQsFADAsMSowKAYDVQQDDCFyZWNtYW5hZ2VydGVzdGIyYy5vbm1pY3Jvc29mdC5jb20wHhcNMjEwNjAxMTIyODQ3WhcNMjMwNjAxMTIzODQ3WjAsMSowKAYDVQQDDCFyZWNtYW5hZ2VydGVzdGIyYy5vbm1pY3Jvc29mdC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUli1Ub7SgJxwGVW2WsdLOfk3hpBEEksk4UzJYX9/SNRqVEdAegOPHQfGtmLncpLcym9j/MWEzptt3C2SHFFldtZe1Pw38GO7/0iJ0SYOykgnLskfTxhHGu54HarFLAQTUjytf0sTGZX7OpFj47eU4XMUE4PRhiqYTuXiPvZVLdB5JIXeGaU6CrRV+ssa4Qk+lFHsSqegEIWmg/BuOHDzWiTn0RBcx1pTM/Mq5kL+gOVKEuMEjlFyeKWe20+d7BUq8E0NPl3soSo0GFj2L7tBvRYHVvOAIRbTJkCL5Yg9Aqu1T9gTrITiprLCXrpOQxoQ20qf2uXtDG5o1L7JzHi05AgMBAAGjUDBOMA4GA1UdDwEB/wQEAwIHgDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwEwHQYDVR0OBBYEFDPpUTJm7z/zenbfHzwoCvEVXaZkMA0GCSqGSIb3DQEBCwUAA4IBAQAdW+REob/gsb/6JEDjKInwixUgtzbf8X3nlEwZHKqe5pJc4e/khJpcMNuaSaq2PHSTSqfYhRB9lNYykBJu1ZzIwLnChGSfn3/STCzMdePTrhlj5+YK3qPFpiT7h/ez7HiElgvk2p9BySAsoR3sLb7KEDffiD8ohMovf20HbxSfMxrmJAvY+LIVxNisqqPD1iOX5ydI7hxMzWaZ2SLztzimEAKQCv5N3b8KHrwBqcMvO7ttm5Q8Sl3gX9YDZCFyw6gHStdovAZnhtoK6rcqNi33UqZPxwWOGjEKtX1u+xtlofhpjz7qoC13i+9cYPi+2sPSUtZIu6ocd9t4+e6Z7j9T",
  };
  // Development identity provider
  /* var idp_options = {
    sso_login_url:
      "https://recmanagerdevb2c.b2clogin.com/recmanagerdevb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/login",
    sso_logout_url:
      "https://recmanagerdevb2c.b2clogin.com/recmanagerdevb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/logout",
    certificates:
      "MIIDMDCCAhigAwIBAgIQGZ/eHAVY8rtL8TY4nKMDQzANBgkqhkiG9w0BAQsFADArMSkwJwYDVQQDDCByZWNtYW5hZ2VyZGV2YjJjLm9ubWljcm9zb2Z0LmNvbTAeFw0yMjA1MDQwOTI0NDRaFw0yMzA1MDQwOTM0NDNaMCsxKTAnBgNVBAMMIHJlY21hbmFnZXJkZXZiMmMub25taWNyb3NvZnQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsmx4Pkrv+het3Y7E159EsJ0wxcMm7Gwj0fWBKFxiNhDKkaa3byOSxWOFE1dRlgAxjaBfgcKhqs1SdReNr81Y0OsOjYVC+LnArfUmC/vZj5DdtOZetoTxP1ghd/GQhdlIjoCLShIQ/rNCTkkwiG8O8K+UCJciHwvPVJiaS6v/oS/040L2JRevRofVtKoV1OS4zi0PN449Jq/Wup9d3PAq4z4HX5wymeprClWLksMmuFLnheo2MztCDgNotAGjL1ps13Y/lnbAL8Wld/g6vflzR1d17STFJEN2GmS7sg/RpGdhY6s6VzeKE0mcbdwcZTd0NJRoMWSnY+4oD7NIBDGJxQIDAQABo1AwTjAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMB0GA1UdDgQWBBSYUdSEZyr+Ob4dL69vKpxRDA0OXjANBgkqhkiG9w0BAQsFAAOCAQEAGCcqysNVitLebe/N9mlPtRObSg+RiWExlJbZzcAyjXAs/m9qZlHZbrA/HS1A6YI7Z8RoUzdYtsft8nPAIgIh9zmgKeBhfWdroVyvruR0IopH8pMlCdfJlfebc5rdEqIHKnaOd0DDHmpoKKTTPK5tH/SBGt+IG29ILifCVSuS4H6S94K9FCIp3A7YYrvpDluHdLpF1O/P/gHwsNcNn9qDRS6YcGhzKRnvySTmmUBvMckuMFiC3rkr8RWiq0fLLcJ/+2z2WIB8TW79NV9nKSzbZkw8Br4dQAVVkJKnGDKE4EEA9SG2BLS+jCAoRD5Jpn8ZAAB6DZ/Q1PilwBRDcGMRjA==",
  }; */
  var idp = new saml2.IdentityProvider(idp_options);

  // ------ Define express endpoints ------

  // Endpoint to retrieve metadata
  server.get("/metadata.xml", function (req, res) {
    res.type("application/xml");
    res.send(sp.create_metadata());
  });

  // Starting point for login
  server.get("/login", function (req, res) {
    sp.create_login_request_url(idp, {}, function (err, login_url, request_id) {
      if (err != null) return res.send(500);
      res.redirect(login_url);
    });
  });

  // Variables used in login/logout process
  /*   var email, name_id, session_index, DisplayName, objectId; */

  // Assert endpoint for when login completes
  server.post("/assert", function (req, res) {
    var options = { request_body: req.body };
    sp.post_assert(idp, options, function (err, saml_response) {
      session = req.session;
      session.user = saml_response.user;
      name = session.user.name_id;
      session_index = session.user.session_index;
      console.error(session);
      if (err != null) {
        console.log("assert error ------ " + err);
        return res.send(err);
      }

      ///add req user across the rest of page.
      /* email = saml_response.user.attributes.email;
      DisplayName = saml_response.user.attributes.DisplayName;
      objectId = saml_response.user.attributes.objectId;
      name_id = saml_response.user.name_id;
      session_index = saml_response.user.session_index; */
    });
    res.redirect("/");
  });

  // Starting point for logout
  server.get("/logout", function (req, res) {
    //req.session.user ? req.session.user.name_id : " ";
    session = req.session;
    var options = {
      name_id: name,
      session_index: session_index,
    };

    sp.create_logout_request_url(idp, options, function (err, logout_url) {
      if (err != null) return res.sendStatus(500);
      req.session.destroy();
      /* name_id = undefined; */
      res.redirect(logout_url);
    });
  });

  server.all("*", (req, res) => {
    if (session.user !== undefined) return handle(req, res);

    res.redirect("/login");
    //return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
