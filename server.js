const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/reviews/:domain", (req, res) => {
    return app.render(req, res, "/reviews", { domain: req.params.domain });
  });

  server.get("/profile/:domain", (req, res) => {
    return app.render(req, res, "/profile", {
      domain: req.params.domain
    });
  });

  server.get("/activate-user/:token", (req, res) => {
    return app.render(req, res, "/activate-user", { token: req.params.token });
  });

  server.get("/reset-password/:token", (req, res) => {
    return app.render(req, res, "/reset-password", { token: req.params.token });
  });

  server.get("/dashboard/:component", (req, res) => {
    return app.render(req, res, "/dashboard", { v: req.params.component });
  });

  server.get("/get-widgets/:domain/", (req, res) => {
    return app.render(req, res, "/get-widgets", {
      domain: req.params.domain
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
  });
});

// "dev": "next",
//     "build": "next build",
//     "start": "next start"
