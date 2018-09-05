#!/usr/bin/env node

// Set the env before any code reads it
process.env.BABEL_ENV = process.env.BABEL_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const args = process.argv[2];
const { spawn } = require('child_process');

const { fetchAllCommits } = require('../src/index');

function runDashboard() {
  const ls = spawn('npm', ['run', 'ui']);
  ls.stdout.on('data', data => {
    console.log(`${data}`);
  });

  ls.stderr.on('data', data => {
    console.log(`${data}`);
  });

  ls.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}
if (args === '--ui') {
  fetchAllCommits('./', true);
  runDashboard();
} else {
  fetchAllCommits('./', false);
}
