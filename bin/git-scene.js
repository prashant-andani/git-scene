#!/usr/bin/env node

// Set the env before any code reads it
process.env.BABEL_ENV = process.env.BABEL_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const { spawn } = require('child_process');

const args = process.argv[2];

const ENVIRONMENT = {
  DEV: { SERVER_PATH: 'cli/server.js', CLIENT_PATH: 'cli/client.js' },
  PROD: {
    SERVER_PATH: 'node_modules/git-scene/cli/server.js',
    CLIENT_PATH: 'node_modules/git-scene/cli/client.js'
  }
};
let curEnv;
if (args === '--dev') {
  curEnv = ENVIRONMENT.DEV;
} else {
  curEnv = ENVIRONMENT.PROD;
}

const runServer = () => {
  const ls = spawn('node', [curEnv.SERVER_PATH]);

  ls.stdout.on('data', data => {
    console.log(`${data}`);
  });

  ls.stderr.on('data', data => {
    console.log(`${data}`);
  });

  ls.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
};

const runDashboard = () => {
  const ls = spawn('node', [curEnv.CLIENT_PATH]);

  ls.stdout.on('data', data => {
    console.log(`${data}`);
  });

  ls.stderr.on('data', data => {
    console.log(`${data}`);
  });

  ls.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
};

const init = () => {
  runDashboard();
  runServer();
};

init();
