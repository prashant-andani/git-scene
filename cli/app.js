const nodegit = require('nodegit');

const Promise = require('promise');
const Moment = require('moment');
const fs = require('fs');
const CliGhCal = require('cli-gh-cal');
const _ = require('lodash');
function reverseObject(object) {
  const newObject = {};
  const keys = [];
  for (let key in object) {
    keys.push(key);
  }
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const value = object[keys[i]];
    newObject[keys[i]] = value;
  }
  return newObject;
}

const REPO_PATH = './';

const getCalendar = data => {
  const cal = Object.entries(data);

  return CliGhCal(cal, {
    theme: 'DARK',
    start: new Moment().subtract(1, 'years'),
    end: new Moment()
  });
};

const getConfig = () =>
  nodegit.Repository.open(REPO_PATH)
    .then(repository => repository.config())
    .then(config => config.getStringBuf('user.name'));

const commitFiles = async () => {
  return nodegit.Repository.open(REPO_PATH).then(repo =>
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
        let promise1 = '';
        let promise2 = '';

        let promise3 = '';

        promise1 = commits.map(async commit => {
          commit.getDiff().then(async arrayDiff => {
            promise2 = arrayDiff.map(async diff => {
              diff.patches().then(async patches => {
                promise3 = patches.map(async patch => {
                  // if (!mostCommitFiles[patch.newFile().path()]) {
                  //   mostCommitFiles[patch.oldFile().path()] = 0;
                  // }
                  // return (mostCommitFiles[patch.oldFile().path()] += 1);
                  return patch.newFile().path();
                });
                const promise3Result = await Promise.all(promise3);
                return promise3Result;
              });
            });
            const promise2Result = await Promise.all(promise3);
            return promise2Result;
          });
        });
        const results = await Promise.all(promise3);
        console.log(results);
        return results;
      })
  );
};

const getReport = authorEmail => {
  const authors = {};
  const dates = {};
  return nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => {
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
        const commitsLen = commits.length;
        for (let i = 0; i < commitsLen; i += 1) {
          let author;
          if (authorEmail) {
            author = authorEmail;
          }
          if (!authors[author]) {
            authors[author] = 0;
          }
          authors[author] += 1;
          // commits by date
          const date = commits[i].date();
          const momentDate = Moment(date)
            .format('YYYY-MM-DD')
            .toString();
          if (author === 'all') {
            // include all commits
            if (!dates[momentDate]) {
              dates[momentDate] = 0;
            }
            dates[momentDate] += 1;
          } else if (commits[i].author().email() === author) {
            if (!dates[momentDate]) {
              dates[momentDate] = 0;
            }
            dates[momentDate] += 1;
          }
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

const getCurrentBranch = () =>
  nodegit.Repository.open(REPO_PATH).then(repo =>
    repo.getCurrentBranch().then(ref => ref.shorthand())
  );

const getFilesCommitCount = async () => {
  return nodegit.Repository.open(REPO_PATH).then(repo =>
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
  return nodegit.Repository.open(REPO_PATH).then(repo =>
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
  return nodegit.Repository.open(REPO_PATH).then(repo =>
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
            date: Moment(commits[i].date()).format('YYYY-MM-DD')
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
  getCurrentBranch,
  commitFiles
};
