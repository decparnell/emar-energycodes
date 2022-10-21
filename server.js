const next = require("next");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  var saml2 = require("saml2-js");
  var fs = require("fs");
  var express = require("express");
  var server = express();
  // If you're using express <4.0:
  var bodyParser = require("body-parser");
  server.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // Create service provider
  var sp_options = {
    entity_id: "https://emar.energycodes.co.uk/recdn/saml20/defaultSP",
    private_key:
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4J0rpnr8bv65MgnrQ1+p7iQn3FCqF+WKQmcWfCYB5m7r5uqewT8fKGQTlglaOT+xPm8e/iSrFAapSx1z3AASZzh9touMs5RvNYsyq/3nAJW9iaghqYb5u8c4M/g3SkaNdGTZH4wkSdR8FGmrfSoX+XXOwBN7lawjNF3/WURv0cPDPhS4Xi9/bLDiP3UD9HFg8SJQTCzMXAxWCSA7ab9enBzSRO7o0zBhDXzj/MQ94UqqCNdxWZ4id6i2keWPQSysM9TmN/ntutabGzEVUSBgcnAVwAEBx/1B6MgwnK48dy6boiVG9k6racZAVbBEGD3YQri+1Q86XubRsFrOHTVRFAgMBAAECggEAGLXdDYApsLWF0+pmRIPUiQMYfTkNg7C1EyYvKGoD/U1yR3ROcBAkhO/agll899eto/kJUqA7Rvg0PKtXxCUSePj5qqKCzVFo66RoRkHFuozLZ29G9c9r2ENGHOQyQqEcRK/PYtIKM5nXsb2bvZ6oYDt1/JaKukokgjC3DLERiTksC+s2ROf6WjOAcJpYpQe3eTVQ/t0coJlWY8ljNZSTKft8MeAW0ZAL3cn3fdGPh+WJN+IQ5rKuYIE/C3GE7sgkK0JtAYGycfPj0tIY/wxDaV6PZf/req3ALLnj1Qoyq1358QORaElrdyAARRT8hXJsP3TLJb5bTbKkw1+xxP88OQKBgQDKLY3B5w0ahpfZCQZ/pYuA2ju/QyJVwN2rDQ/asfDSNzNl7oTSf4kPVJ5CX5MXsRAcoHiSk9Rhei5CVIQvhknddTWjSnTqQGQLk1bhsdnXyqrplv+d+GwimL3vfYRI2X/T+cz44zgLE3StkFKBD/uQBqfqux8RYO9r6xzA7KN23wKBgQDpLV7RjLX8hOhePifSTXuiUPfdmS2jltTO+UW9iGSu9i8I/f9e5csdfVfWFXwo/chQl2lPU7uztcO75mLEJUtVS6KzjRvhEjAiqWrqJqxcOAi5b9/QGme4m9GZdmroQG9NDW7IpHqa7dZNNVunwt+f4sC8QeMI5oEV2cA3hK9NWwKBgGJvM2mIuNSFW0EMJ+HWE8m0dwp0AS+HK2WwgluT7xAqWBf0vS5PccfJBxSBu/f4+UM2zf1vhCPBfOxGgeUxmJz+CBNsmOfEWfFY1yAjm1B5GCWKowGiheOCQldr4RAm9RmbsbQrzIl3+4LVlZXI1k4VL4QVftbTPz5nxiQYEq45AoGAGNS3CzOj0Z9Jq3eNAA02REPBEX0Vah1OzjenYJacujEHMzrxLebkqWBGsUqabTcRVNu64DK3g1yw2lqfW+noys2CJwK43E/2hkpqU0MJCc0ByNWMDPoy32rgeCovGkp6T8dFa+JwF/2J27D58LSE4d7gzWtqxPDfADevC3p6vI8CgYEAtegmCq6bTL6D8haP0j3t+qdjNTJlZoVlepJlpCPZiIRgdVj4T6fk1Ye1EdGuKSq2LlfBQENLu5JugwPmXRXqnvNkfyBypdHTiZtHHD9J1z5b56Z4kMsJDzG0lgE1O4TdnVAqExumhbe5Y7GpDjva3QRTBPhy4DUo0ZmCWRhzIhY=",
    certificate:
      "MIIDRDCCAiygAwIBAgIQQLvOYPT2TVmvIS0m+OdcfDANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDDBRSZWNfRGlnaXRhbE5hdmlnYXRvcjAeFw0yMjEwMDUwODU2NDZaFw0zMjEwMDUwOTA2NDZaMB8xHTAbBgNVBAMMFFJlY19EaWdpdGFsTmF2aWdhdG9yMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuCdK6Z6/G7+uTIJ60Nfqe4kJ9xQqhflikJnFnwmAeZu6+bqnsE/HyhkE5YJWjk/sT5vHv4kqxQGqUsdc9wAEmc4fbaLjLOUbzWLMqv95wCVvYmoIamG+bvHODP4N0pGjXRk2R+MJEnUfBRpq30qF/l1zsATe5WsIzRd/1lEb9HDwz4UuF4vf2yw4j91A/RxYPEiUEwszFwMVgkgO2m/Xpwc0kTu6NMwYQ184/zEPeFKqgjXcVmeIneotpHlj0EsrDPU5jf57brWmxsxFVEgYHJwFcABAcf9QejIMJyuPHcum6IlRvZOq2nGQFWwRBg92EK4vtUPOl7m0bBazh01URQIDAQABo3wwejAOBgNVHQ8BAf8EBAMCBaAwCQYDVR0TBAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwHwYDVR0jBBgwFoAU4n9m20aXwIrxA2LncVHg23bUn/wwHQYDVR0OBBYEFOJ/ZttGl8CK8QNi53FR4Nt21J/8MA0GCSqGSIb3DQEBCwUAA4IBAQBwUnJYrr1Khu7RetYy649lKn02PjzThuZZXE+0ClJys5NGDW0rdjk//8LSZSe8cpUtY38kc45LQUrtu3V2LsrVHafdj4an1+0jFNBc4d6cqCiuoSx62c9q0JAJkeFv4YvgQHI8oA0wPghi3uIQ7o08Qm4gCuE/wbS6dYT692sM3NX8FE+mhPPBFfozJtJOUaj1pTymR9eNmLqMC8d9GDuFQe+crXQWCI+MNClGL+gIdBbLq5yP+lvaDKnzAdI5U5g2965kBK9f71ekRo2X2E+OVZhjPjdwqKM3kSPS3wiJ31uT3CUAkTgFspShvcXHFAtlgqzzb1Ql9kYYys0z31SU",
    assert_endpoint: "https://emar-energycodes.azurewebsites.net/assert",
    sign_get_request: true,
  };
  var sp = new saml2.ServiceProvider(sp_options);

  // Create identity provider
  var idp_options = {
    sso_login_url:
      "https://recmanagerdevb2c.b2clogin.com/recmanagerdevb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/login",
    sso_logout_url:
      "https://recmanagerdevb2c.b2clogin.com/recmanagerdevb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/logout",
    certificates:
      "MIIDMDCCAhigAwIBAgIQGZ/eHAVY8rtL8TY4nKMDQzANBgkqhkiG9w0BAQsFADArMSkwJwYDVQQDDCByZWNtYW5hZ2VyZGV2YjJjLm9ubWljcm9zb2Z0LmNvbTAeFw0yMjA1MDQwOTI0NDRaFw0yMzA1MDQwOTM0NDNaMCsxKTAnBgNVBAMMIHJlY21hbmFnZXJkZXZiMmMub25taWNyb3NvZnQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsmx4Pkrv+het3Y7E159EsJ0wxcMm7Gwj0fWBKFxiNhDKkaa3byOSxWOFE1dRlgAxjaBfgcKhqs1SdReNr81Y0OsOjYVC+LnArfUmC/vZj5DdtOZetoTxP1ghd/GQhdlIjoCLShIQ/rNCTkkwiG8O8K+UCJciHwvPVJiaS6v/oS/040L2JRevRofVtKoV1OS4zi0PN449Jq/Wup9d3PAq4z4HX5wymeprClWLksMmuFLnheo2MztCDgNotAGjL1ps13Y/lnbAL8Wld/g6vflzR1d17STFJEN2GmS7sg/RpGdhY6s6VzeKE0mcbdwcZTd0NJRoMWSnY+4oD7NIBDGJxQIDAQABo1AwTjAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMB0GA1UdDgQWBBSYUdSEZyr+Ob4dL69vKpxRDA0OXjANBgkqhkiG9w0BAQsFAAOCAQEAGCcqysNVitLebe/N9mlPtRObSg+RiWExlJbZzcAyjXAs/m9qZlHZbrA/HS1A6YI7Z8RoUzdYtsft8nPAIgIh9zmgKeBhfWdroVyvruR0IopH8pMlCdfJlfebc5rdEqIHKnaOd0DDHmpoKKTTPK5tH/SBGt+IG29ILifCVSuS4H6S94K9FCIp3A7YYrvpDluHdLpF1O/P/gHwsNcNn9qDRS6YcGhzKRnvySTmmUBvMckuMFiC3rkr8RWiq0fLLcJ/+2z2WIB8TW79NV9nKSzbZkw8Br4dQAVVkJKnGDKE4EEA9SG2BLS+jCAoRD5Jpn8ZAAB6DZ/Q1PilwBRDcGMRjA==",
  };
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
  var name_id, session_index;

  // Assert endpoint for when login completes
  server.post("/assert", function (req, res) {
    var options = { request_body: req.body };
    sp.post_assert(idp, options, function (err, saml_response) {
      if (err != null) return res.sendStatus(500);

      // Save name_id and session_index for logout
      // Note:  In practice these should be saved in the user session, not globally.
      name_id = saml_response.user.name_id;
      session_index = saml_response.user.session_index;

      res.send("Hello #{name_id}! session_index: #{session_index}.");
    });
  });

  // Starting point for logout
  server.get("/logout", function (req, res) {
    var options = {
      name_id: name_id,
      session_index: session_index,
    };

    sp.create_logout_request_url(idp, options, function (err, logout_url) {
      if (err != null) return res.sendStatus(500);
      res.redirect(logout_url);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  /*   server.route("/login-idp").get(passport.authenticate("samlStrategy"));
  server.route("/login-idp/callback").post(samlCallback(passport));

  server.route("/metadata").get(function (req, res) {
    res.type("application/xml");
    res.status(200);
    res.send(
      samlStrategy.generateServiceProviderMetadata(
        fs.readFileSync("./certs/cert.pem", "utf8"),
        fs.readFileSync("./certs/cert.pem", "utf8")
      )
    );
  }); */

  /* server.post(
    "/login/callback",
    bodyParser.urlencoded({ extended: false }),
    passport.authenticate("samlStrategy", {
      failureRedirect: "/",
      failureFlash: true,
    }),
    function (req, res) {
      res.redirect("/");
    }
  );

  server.get(
    "/login",
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
    function (req, res) {
      res.redirect("/");
    }
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  }); */
});
