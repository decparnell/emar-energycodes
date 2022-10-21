module.exports = {
  development: {
    app: {
      name: "Passport SAML strategy example",
      port: process.env.PORT || 3000,
    },
    passport: {
      strategy: "saml",
      saml: {
        entryPoint:
          "https://recmanagerdevb2c.b2clogin.com/recmanagerdevb2c.onmicrosoft.com/B2C_1A_signup_signin_saml/samlp/sso/login",
        issuer: "https://emar.energycodes.co.uk/recdn/saml20/defaultSP",
        callbackUrl:
          "https://emar.energycodes.co.uk/recdn/saml20/defaultSP/acs",
        cert: "MIIDMDCCAhigAwIBAgIQGZ/eHAVY8rtL8TY4nKMDQzANBgkqhkiG9w0BAQsFADArMSkwJwYDVQQDDCByZWNtYW5hZ2VyZGV2YjJjLm9ubWljcm9zb2Z0LmNvbTAeFw0yMjA1MDQwOTI0NDRaFw0yMzA1MDQwOTM0NDNaMCsxKTAnBgNVBAMMIHJlY21hbmFnZXJkZXZiMmMub25taWNyb3NvZnQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsmx4Pkrv+het3Y7E159EsJ0wxcMm7Gwj0fWBKFxiNhDKkaa3byOSxWOFE1dRlgAxjaBfgcKhqs1SdReNr81Y0OsOjYVC+LnArfUmC/vZj5DdtOZetoTxP1ghd/GQhdlIjoCLShIQ/rNCTkkwiG8O8K+UCJciHwvPVJiaS6v/oS/040L2JRevRofVtKoV1OS4zi0PN449Jq/Wup9d3PAq4z4HX5wymeprClWLksMmuFLnheo2MztCDgNotAGjL1ps13Y/lnbAL8Wld/g6vflzR1d17STFJEN2GmS7sg/RpGdhY6s6VzeKE0mcbdwcZTd0NJRoMWSnY+4oD7NIBDGJxQIDAQABo1AwTjAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMB0GA1UdDgQWBBSYUdSEZyr+Ob4dL69vKpxRDA0OXjANBgkqhkiG9w0BAQsFAAOCAQEAGCcqysNVitLebe/N9mlPtRObSg+RiWExlJbZzcAyjXAs/m9qZlHZbrA/HS1A6YI7Z8RoUzdYtsft8nPAIgIh9zmgKeBhfWdroVyvruR0IopH8pMlCdfJlfebc5rdEqIHKnaOd0DDHmpoKKTTPK5tH/SBGt+IG29ILifCVSuS4H6S94K9FCIp3A7YYrvpDluHdLpF1O/P/gHwsNcNn9qDRS6YcGhzKRnvySTmmUBvMckuMFiC3rkr8RWiq0fLLcJ/+2z2WIB8TW79NV9nKSzbZkw8Br4dQAVVkJKnGDKE4EEA9SG2BLS+jCAoRD5Jpn8ZAAB6DZ/Q1PilwBRDcGMRjA==",
        signatureAlgorithm: "sha256",
        privatekey:
          "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4J0rpnr8bv65MgnrQ1+p7iQn3FCqF+WKQmcWfCYB5m7r5uqewT8fKGQTlglaOT+xPm8e/iSrFAapSx1z3AASZzh9touMs5RvNYsyq/3nAJW9iaghqYb5u8c4M/g3SkaNdGTZH4wkSdR8FGmrfSoX+XXOwBN7lawjNF3/WURv0cPDPhS4Xi9/bLDiP3UD9HFg8SJQTCzMXAxWCSA7ab9enBzSRO7o0zBhDXzj/MQ94UqqCNdxWZ4id6i2keWPQSysM9TmN/ntutabGzEVUSBgcnAVwAEBx/1B6MgwnK48dy6boiVG9k6racZAVbBEGD3YQri+1Q86XubRsFrOHTVRFAgMBAAECggEAGLXdDYApsLWF0+pmRIPUiQMYfTkNg7C1EyYvKGoD/U1yR3ROcBAkhO/agll899eto/kJUqA7Rvg0PKtXxCUSePj5qqKCzVFo66RoRkHFuozLZ29G9c9r2ENGHOQyQqEcRK/PYtIKM5nXsb2bvZ6oYDt1/JaKukokgjC3DLERiTksC+s2ROf6WjOAcJpYpQe3eTVQ/t0coJlWY8ljNZSTKft8MeAW0ZAL3cn3fdGPh+WJN+IQ5rKuYIE/C3GE7sgkK0JtAYGycfPj0tIY/wxDaV6PZf/req3ALLnj1Qoyq1358QORaElrdyAARRT8hXJsP3TLJb5bTbKkw1+xxP88OQKBgQDKLY3B5w0ahpfZCQZ/pYuA2ju/QyJVwN2rDQ/asfDSNzNl7oTSf4kPVJ5CX5MXsRAcoHiSk9Rhei5CVIQvhknddTWjSnTqQGQLk1bhsdnXyqrplv+d+GwimL3vfYRI2X/T+cz44zgLE3StkFKBD/uQBqfqux8RYO9r6xzA7KN23wKBgQDpLV7RjLX8hOhePifSTXuiUPfdmS2jltTO+UW9iGSu9i8I/f9e5csdfVfWFXwo/chQl2lPU7uztcO75mLEJUtVS6KzjRvhEjAiqWrqJqxcOAi5b9/QGme4m9GZdmroQG9NDW7IpHqa7dZNNVunwt+f4sC8QeMI5oEV2cA3hK9NWwKBgGJvM2mIuNSFW0EMJ+HWE8m0dwp0AS+HK2WwgluT7xAqWBf0vS5PccfJBxSBu/f4+UM2zf1vhCPBfOxGgeUxmJz+CBNsmOfEWfFY1yAjm1B5GCWKowGiheOCQldr4RAm9RmbsbQrzIl3+4LVlZXI1k4VL4QVftbTPz5nxiQYEq45AoGAGNS3CzOj0Z9Jq3eNAA02REPBEX0Vah1OzjenYJacujEHMzrxLebkqWBGsUqabTcRVNu64DK3g1yw2lqfW+noys2CJwK43E/2hkpqU0MJCc0ByNWMDPoy32rgeCovGkp6T8dFa+JwF/2J27D58LSE4d7gzWtqxPDfADevC3p6vI8CgYEAtegmCq6bTL6D8haP0j3t+qdjNTJlZoVlepJlpCPZiIRgdVj4T6fk1Ye1EdGuKSq2LlfBQENLu5JugwPmXRXqnvNkfyBypdHTiZtHHD9J1z5b56Z4kMsJDzG0lgE1O4TdnVAqExumhbe5Y7GpDjva3QRTBPhy4DUo0ZmCWRhzIhY=",
      },
    },
  },
};
