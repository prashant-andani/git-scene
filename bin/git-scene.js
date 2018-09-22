#!/usr/bin/env node

// Set the env before any code reads it
process.env.BABEL_ENV = process.env.BABEL_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const { spawn } = require('child_process');
const path = require('path');
const { commitFiles } = require('../cli/app');

const args = process.argv[2];
function runServer() {
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
function runDashboard() {
  const ls = spawn('node', ['cli/client.js']);

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
  runServer();
} else {
  commitFiles();
}
