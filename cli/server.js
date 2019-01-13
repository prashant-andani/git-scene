const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {
  getCurrentBranch,
  getContribList,
  getAllCommits,
  getReport,
  commitFiles,
  getFilesCommitCount,
  getAuthorStats
} = require('./app');

const app = express();
const PORT = 8008;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/getCurrentBranch', (req, res) => {
  getCurrentBranch().then(branchName => {
    console.log(branchName);
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
app.post('/getCommitHistory', (req, res) => {
  const { author, duration } = req.body;
  getReport(author, duration).then(data => {
    res.send(JSON.stringify(data));
  });
});
app.get('/commitFiles', (req, res) => {
  commitFiles().then(data => {
    res.send(JSON.stringify(data));
  });
});
app.get('/getFilesCommitCount', (req, res) => {
  getFilesCommitCount().then(data => {
    res.send(JSON.stringify(data));
  });
});
app.get('/getAuthorStats', (req, res) => {
  getAuthorStats().then(data => {
    res.send(JSON.stringify(data));
  });
});

app.listen(PORT, () => {
  console.log(`API Server Running at: http://localhost:${PORT}`);
});
