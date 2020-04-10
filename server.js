const express = require('express');
const projectRouter = require("./data/projectstrouter");
const actionRouter = require("./data/actionsrouter");
const cors = require("cors");
const server = express();

server.use(logger);
server.use(cors());
server.use(express.json());

server.use("/projects",projectRouter);
server.use("/actions",actionRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Try out:</h2>\n<p>/projects</p><p>actions</p>`);
});

module.exports = server;

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}





