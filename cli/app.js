const nodegit = require('nodegit');
const Promise = require('promise');
const colors = require('colors/safe');
const Moment = require('moment');
const fs = require('fs');
const CliGhCal = require('cli-gh-cal');
const _ = require('lodash');

function reverseObject(object) {
  var newObject = {};
  var keys = [];
  for (var key in object) {
    keys.push(key);
  }
  for (var i = keys.length - 1; i >= 0; i--) {
    var value = object[keys[i]];
    newObject[keys[i]] = value;
  }

  return newObject;
}

const repoPath = './';
const getCalendar = data => {
  const cal = Object.entries(data);

  return CliGhCal(cal, {
    theme: 'DARK',
    start: new Moment().subtract(1, 'years'),
    end: new Moment()
  });
};
const getConfig = () => {
  return nodegit.Repository.open(repoPath)
    .then(function(repository) {
      return repository.config();
    })
    .then(function(config) {
      return config.getStringBuf('user.name');
    });
};

const getReport = () => {
  const authors = {};
  const dates = {};
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => {
        /* Get the commit that the branch points at. */
        return repo.getBranchCommit(ref.shorthand());
      })
      .then(commit => {
        /* Set up the event emitter and a promise to resolve when it finishes up. */
        const hist = commit.history();

        const p = new Promise((resolve, reject) => {
          hist.on('end', resolve);
          hist.on('error', reject);
        });
        hist.start();
        return p;
      })
      .then(commits => {
        /* Iterate through the last 10 commits of the history. */
        for (let i = 0; i < commits.length; i += 1) {
          const author = commits[i].author().email();
          if (!authors[author]) {
            authors[author] = 0;
          }
          authors[author] += 1;
          // commits by date
          const date = new Date(commits[i].date());
          const momentDate = Moment(date).format('DD-MMM-YYYY');
          // date = toTimestamp(date);
          if (!dates[momentDate]) {
            dates[momentDate] = 0;
          }
          dates[momentDate] += 1;
        }

        return reverseObject(dates);
      })
  );
};

const shipDashboardData = (commits, branchName) => {
  const obj = { totalCommits: commits.length, branch: branchName };
  const authors = {};
  for (let i = 0; i < commits.length; i += 1) {
    const author = commits[i].author().email();
    if (!authors[author]) {
      authors[author] = 0;
    }
    authors[author] += 1;
  }
  obj.authors = authors;
  const lastCommit = commits[0];

  obj.lastCommit = {
    message: lastCommit.message(),
    author: lastCommit.author().email(),
    date: lastCommit.date()
  };

  const json = JSON.stringify(obj);
  fs.writeFile('data/dashboard.json', json);

  return obj;
};

const getCurrentBranch = () => {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo.getCurrentBranch().then(ref => {
      /* Get the commit that the branch points at. */
      return ref.shorthand();
    })
  );
};

const getFilesCommitCount = async () => {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => {
        /* Get the commit that the branch points at. */
        return repo.getBranchCommit(ref.shorthand());
      })
      .then(commit => {
        /* Set up the event emitter and a promise to resolve when it finishes up. */
        const hist = commit.history();

        const p = new Promise((resolve, reject) => {
          hist.on('end', resolve);
          hist.on('error', reject);
        });

        hist.start();
        return p;
      })
      .then(async commits => {
        const mostCommitFiles = {};
        commits.map(commit => {
          commit.getDiff().then(async arrayDiff => {
            return arrayDiff.map(diff => {
              diff.patches().then(async patches => {
                return patches.map(patch => {
                  if (!mostCommitFiles[patch.newFile().path()]) {
                    mostCommitFiles[patch.oldFile().path()] = 0;
                  }
                  return (mostCommitFiles[patch.oldFile().path()] += 1);
                });
              });
            });
          });
        });
        return mostCommitFiles;
      })
  );
};
const getContribList = () => {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => {
        /* Get the commit that the branch points at. */
        return repo.getBranchCommit(ref.shorthand());
      })
      .then(commit => {
        /* Set up the event emitter and a promise to resolve when it finishes up. */
        const hist = commit.history();

        const p = new Promise((resolve, reject) => {
          hist.on('end', resolve);
          hist.on('error', reject);
        });

        hist.start();
        return p;
      })
      .then(commits => {
        const authors = {};
        for (let i = 0; i < commits.length; i += 1) {
          const author = commits[i].author().email();
          if (!authors[author]) {
            authors[author] = 0;
          }
          authors[author] += 1;
        }

        return authors;
      })
  );
};

const getAllCommits = () => {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => {
        /* Get the commit that the branch points at. */
        return repo.getBranchCommit(ref.shorthand());
      })
      .then(commit => {
        /* Set up the event emitter and a promise to resolve when it finishes up. */
        const hist = commit.history();

        const p = new Promise((resolve, reject) => {
          hist.on('end', resolve);
          hist.on('error', reject);
        });
        hist.start();
        return p;
      })
      .then(commits => {
        const commitObj = [];
        const commitsLen = commits.length;
        for (let i = 0; i < commitsLen; i += 1) {
          const commit = {
            message: commits[i].message(),
            author: commits[i].author().email(),
            date: commits[i].date()
          };

          commitObj.push(commit);
        }
        return commitObj;
      })
  );
};

module.exports = {
  getContribList,
  getReport,
  getCalendar,
  getConfig,
  getFilesCommitCount,
  getAllCommits,
  getCurrentBranch
};
