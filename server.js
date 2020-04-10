const express = require('express');
const projectRouter = require("./data/projectstrouter");

const server = express();

// server.use(logger);

server.use(express.json());

server.use("/projects",projectRouter);
// server.use("/posts",postRouter)


// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

module.exports = server;

// function logger(req, res, next) {
//   console.log(`${req.method} Request to ${req.originalUrl}`);
//   next();
// }
