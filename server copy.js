const express = require("express");
const next = require("next");
const passport = require("passport");
const saml = require("passport-saml");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("/hello", (req, res) => {
    res.send("Hello World!");
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

  server.post(
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
  });
});
