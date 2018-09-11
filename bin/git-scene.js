#!/usr/bin/env node

// Set the env before any code reads it
process.env.BABEL_ENV = process.env.BABEL_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const { spawn } = require('child_process');
const path = require('path');

const args = process.argv[2];

function runDashboard() {
  const ls = spawn('node', ['cli/server.js']);

  ls.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}
if (args === '--ui') {
  runDashboard();
} else {
  const { fetchAllCommits } = require('../cli/index');
}
