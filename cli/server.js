const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');

const {
  getCurrentBranch,
  getContribList,
  getAllCommits,
  getReport,
  commitFiles
} = require('./app');

const app = express();
const PORT = 8008;

// Setup logger
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  );
  next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/getCurrentBranch', (req, res) => {
  getCurrentBranch().then(branchName => {
    res.send(JSON.stringify({ branchName }));
  });
});

app.get('/getAllAuthors', (req, res) => {
  getContribList().then(data => {
    res.send(JSON.stringify(data));
  });
});

app.get('/getAllCommits', (req, res) => {
  getAllCommits().then(data => {
    res.send(JSON.stringify(data));
  });
});
app.get('/getCommitHistory/:author', (req, res) => {
  getReport(req.params.author).then(data => {
    res.send(JSON.stringify(data));
  });
});
app.get('/commitFiles', (req, res) => {
  commitFiles().then(data => {
    res.send(JSON.stringify(data));
  });
});
app.listen(PORT, () => {
  console.log(`API Server Running at: http://localhost:${PORT}`);
});
