const nodegit = require('nodegit');

const Promise = require('promise');
const Moment = require('moment');
const CliGhCal = require('cli-gh-cal');
const _ = require('lodash');

console.log('cwd');
console.log(process.cwd());

function reverseObject(object) {
  const newObject = {};
  const keys = [];
  for (const key in object) {
    keys.push(key);
  }
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const value = object[keys[i]];
    newObject[keys[i]] = value;
  }
  return newObject;
}

const REPO_PATH = '../tekagogo-monorepo';

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

const commitFiles = async () =>
  nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref =>
        /* Get the commit that the branch points at. */
        repo.getBranchCommit(ref.shorthand())
      )
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
        let promise3 = '';

        commits.map(async commit => {
          commit.getDiff().then(async arrayDiff => {
            arrayDiff.map(async diff => {
              diff.patches().then(async patches => {
                promise3 = patches.map(async patch => patch.newFile().path());
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

const getReport = (authorEmail, duration) => {
  const authors = {};
  const dates = {};

  return nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => repo.getBranchCommit(ref.shorthand()))
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
          const momentDate = Moment(date).format('YYYY-MM-DD');
          if (
            momentDate >= duration &&
            momentDate <= Moment().format('YYYY-MM-DD')
          ) {
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
        }
        return reverseObject(dates);
      })
  );
};

const getCurrentBranch = () =>
  nodegit.Repository.open(REPO_PATH).then(repo => {
    console.log('repo');
    return repo.getCurrentBranch().then(ref => ref.shorthand());
  });

const getAuthorStats = async () => {
  const fileStats = { added: 0, deleted: 0, modified: 0 };
  const dates = {};
  const allFiles = nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => repo.getBranchCommit(ref.shorthand()))
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
        const results = commits.map(async commit =>
          commit.getDiff().then(arrayDiff => {
            const date = commit.date();
            const momentDate = Moment(date).format('YYYY-MM-DD');
            const diffRe = arrayDiff.map(async diff =>
              diff.patches().then(patches => {
                const patchRe = patches.map(async patch => {
                  if (!dates[momentDate]) {
                    dates[momentDate] = { added: 0, deleted: 0, modified: 0 };
                  }
                  if (patch.isAdded()) {
                    dates[momentDate].added += 1;
                  } else if (patch.isDeleted()) {
                    dates[momentDate].deleted += 1;
                  } else if (patch.isModified()) {
                    dates[momentDate].modified += 1;
                  }
                  return patch.lineStats();
                });
                return Promise.all(patchRe);
              })
            );
            return Promise.all(diffRe);
          })
        );
        return Promise.all(results);
      })
  );
  return allFiles.then(files => {
    const stringFiles = String(files).replace(/[[\]']+/g, '');

    const filesArray = stringFiles.split(',');
    const filesObj = {};
    for (let i = 0; i < filesArray.length; i += 1) {
      const file = filesArray[i];
      if (filesObj[file] === undefined) {
        filesObj[file] = 0;
      } else {
        filesObj[file] += 1;
      }
    }
    console.log(dates);
    return dates;
  });
};

const getFilesCommitCount = async () => {
  const allFiles = nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => repo.getBranchCommit(ref.shorthand()))
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
        const results = commits.map(async commit =>
          commit.getDiff().then(arrayDiff => {
            const diffRe = arrayDiff.map(async diff =>
              diff.patches().then(patches => {
                const patchRe = patches.map(async patch =>
                  patch.oldFile().path()
                );
                return Promise.all(patchRe);
              })
            );
            return Promise.all(diffRe);
          })
        );
        return Promise.all(results);
      })
  );
  return allFiles.then(files => {
    const stringFiles = String(files).replace(/[[\]']+/g, '');

    const filesArray = stringFiles.split(',');
    const filesObj = {};
    for (let i = 0; i < filesArray.length; i += 1) {
      const file = filesArray[i];
      if (filesObj[file] === undefined) {
        filesObj[file] = 0;
      } else {
        filesObj[file] += 1;
      }
    }
    return filesObj;
  });
};

const getContribList = () =>
  nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => repo.getBranchCommit(ref.shorthand()))
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
            authors[author] = 1;
          }
          authors[author] += 1;
        }

        return authors;
      })
  );

const getAllCommits = () =>
  nodegit.Repository.open(REPO_PATH).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => repo.getBranchCommit(ref.shorthand()))
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
            date: Moment(commits[i].date()).format('YYYY-MM-DD'),
            sha: commits[i].sha(),
            body: commits[i].body(),
            summary: commits[i].summary()
          };
          commitObj.push(commit);
        }
        return commitObj;
      })
  );

module.exports = {
  getContribList,
  getReport,
  getCalendar,
  getConfig,
  getFilesCommitCount,
  getAllCommits,
  getCurrentBranch,
  commitFiles,
  getAuthorStats
};
