const next = require("next");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const moduleSettings = require("./components/moduleSettings");

app.prepare().then(() => {
  var saml2 = require("saml2-js");
  var express = require("express");
  var server = express();
  var cookieParser = require("cookie-parser");
  //cookies-session
  var session = require("express-session");

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  // creating 24 hours from milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  var sesh = {
    secret: moduleSettings.seshPhrase,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  };

  var sp_options, idp_options;

  //for testing on the pre-prod env
  const serverEnv = "pre-production";

  if (server.get("env") === "production" && serverEnv === "production") {
    server.set("trust proxy", 1); // trust first proxy
    sesh.cookie.secure = true; // serve secure cookies
    sp_options = moduleSettings.prod_sp_options;
    idp_options = moduleSettings.prod_idp_options;
  } else {
    sp_options = moduleSettings.test_sp_options;
    idp_options = moduleSettings.test_idp_options;
  }
  server.use(session(sesh));
  // cookie parser middleware
  server.use(cookieParser());

  var sp = new saml2.ServiceProvider(sp_options);
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

  // Assert endpoint for when login completes
  server.post("/assert", function (req, res) {
    var options = { request_body: req.body };
    sp.post_assert(idp, options, function (err, saml_response) {
      req.session.user =
        typeof saml_response !== "undefined" &&
        typeof saml_response.user !== "undefined"
          ? saml_response.user
          : "";
      req.session.save();

      if (err != null) {
        console.log("assert error ------ " + err);
        return res.send(err);
      }
    });
    res.redirect("/");
  });

  // Starting point for logout
  server.get("/logout", function (req, res) {
    //req.session.user ? req.session.user.name_id : " ";
    //session = req.session;
    var name = "";
    var session_index = "";
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
    if (req.session && typeof req.session.user !== "undefined") {
      return handle(req, res);
    }

    res.redirect("/login");
    //return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
