const blessed = require('blessed'),
  contrib = require('blessed-contrib');
const chalk = require('chalk');

const {
  getContribList,
  getReport,
  getCalendar,
  getAllCommits,
  getCurrentBranch
} = require('./app');

getAllCommits().then(data => {
  console.log('Total Commits: ' + chalk.yellow(data.length));
});
getCurrentBranch().then(branchName => {
  console.log('Branch: ' + chalk.yellow(branchName));
});

const screen = blessed.screen();
getReport().then(data => {
  const line = contrib.line({
    style: {
      line: 'yellow',
      text: 'green',
      baseline: 'black'
    },
    xLabelPadding: 3,
    xPadding: 5,
    showLegend: true,
    wholeNumbersOnly: false //true=do not show fraction in y axis
  });
  const commits = {
    title: '',
    x: Object.keys(data),
    y: Object.values(data)
  };
  console.log(getCalendar(data));

  var commitsGrid = grid.set(4, 0, 7, 7, blessed.box, {
    label: 'Commit History'
  });
  commitsGrid.append(line); //must append before setting data
  line.setData([commits]);
  screen.render();
});

getContribList().then(data => {
  let contribList = Object.entries(data);
  const tableOptions = {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    width: '30%',
    height: '30%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10, //in chars
    columnWidth: [30, 7] /*in chars*/
  };
  var table = grid.set(0.6, 8, 3.3, 4, contrib.table, tableOptions);
  //allow control the table with the keyboard
  table.focus();

  table.setData({
    headers: ['Author', 'Commits'],
    data: contribList
  });

  screen.append(table);
  screen.render();
});

// //must append before setting data
var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render();
