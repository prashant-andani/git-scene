const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = 3001;

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../ui', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../ui', 'build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(
    chalk.yellow('See you at: ') + chalk.green(`http://localhost:${PORT}`)
  );
});
