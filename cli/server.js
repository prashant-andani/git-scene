const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = 8000;
require('./api/routes')(app, {});

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../dashboard', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dashboard', 'build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(
    chalk.yellow('See you at:') + chalk.green('http://localhost:' + PORT)
  );
});
