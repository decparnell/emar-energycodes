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
      },
    },
  },
};
