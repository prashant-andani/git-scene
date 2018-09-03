const nodegit = require('nodegit');
const Promise = require('promise');
const colors = require('colors/safe');
const Moment = require('moment');
const fs = require('fs');
const CliGhCal = require('cli-gh-cal');
// const toTimestamp = strDate => Date.parse(strDate);
const getCalendar = data => {
  const cal = Object.entries(data);
  console.log(colors.yellow('-------------------------------------'));
  console.log(colors.green('Contribution Calendar'));
  console.log(colors.yellow('-------------------------------------'));

  console.log(
    CliGhCal(cal, {
      theme: 'DARK',
      start: new Moment().subtract(1, 'years'),
      end: new Moment()
    })
  );
};

const getReport = commits => {
  const authors = {};
  const dates = {};
  const obj = {};
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
  commits[commits.length - 1]
    .getEntry('README.md')

    .then(entry =>
      entry.getBlob().then(blob => {
        blob.entry = entry;
        return blob;
      })
    )
    // Display information about the blob.
    .then(blob => {
      // Show the path, sha, and filesize in bytes.
      console.log(`${blob.rawsize()}b`);
      console.log(blob.filemode());
      // Show a spacer.

      // Show the entire file.
      // console.log(String(blob));
    });
  const json = JSON.stringify(dates);
  getCalendar(dates);
  //  console.log(json);
  fs.writeFile('dashboard/data/commits_count.json', json);
  return obj;
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
  fs.writeFile('dashboard/data/dashboard.json', json);
  return obj;
};

const generateContribList = commits => {
  const authors = {};
  for (let i = 0; i < commits.length; i += 1) {
    const author = commits[i].author().email();
    if (!authors[author]) {
      authors[author] = 0;
    }
    authors[author] += 1;
  }
  console.log(colors.yellow('-------------------------------------'));
  console.log(colors.rainbow('**** Contributors ****'));
  console.log(colors.yellow('-------------------------------------'));

  Object.keys(authors).forEach(author => {
    console.log('*', author, '--', colors.green(authors[author]));
  });

  console.log(colors.yellow('-------------------------------------'));
  const totalContributors = Object.keys(authors).length;
  console.log(colors.green(`No. of Contributors: ${totalContributors}`));
  console.log(colors.green(`Total Commits: ${commits.length}`)); // outputs green text
  console.log(colors.yellow('-------------------------------------'));
};

const shipCommits = commits => {
  const commitObj = [];
  const commitsLen = commits.length;
  const commitsToShow = 5;
  for (let i = 0; i < commitsLen; i += 1) {
    const commit = {
      message: commits[i].message(),
      author: commits[i].author().email(),
      date: commits[i].date()
    };

    if (i < commitsToShow) {
      console.log(`${commit.message} : ${commit.author}`);
    }

    commitObj.push(commit);
  }
  const json = JSON.stringify(commitObj);
  fs.writeFile('dashboard/data/commits.json', json);
  return commitObj;
};

const getAllFiles = repo_path => {
  nodegit.Repository.open(repo_path).then(repo =>
    repo
      .getCurrentBranch()
      .then(ref => repo.getBranchCommit(ref.shorthand()))
      .then(commits => {
        // console.log(commit);
        /* Set up the event emitter and a promise to resolve when it finishes up. */
        const hist = commits.history();

        const p = new Promise((resolve, reject) => {
          hist.on('end', resolve);
          hist.on('error', reject);
        });
        hist.start();
        return p;
      })
      .then(commits => commits[18].getTree())
      .then(tree => {
        const walker = tree.walk();
        // console.log('Owner', tree.owner());
        walker.on('entry', entry => {
          // console.log(entry.path());
        });
        walker.start();
      })
      .done()
  );
};

const fetchAllCommits = repoPath => {
  let branchName = '';
  getAllFiles(repoPath);

  nodegit.Repository.open(repoPath)
    .then(repo =>
      repo
        .getCurrentBranch()
        .then(ref => {
          console.log(colors.magenta(`Branch: ${ref.shorthand()}`));

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
          getReport(commits);
          generateContribList(commits);
          // shipDashboardData(commits, branchName);
          shipCommits(commits);
        })
    )

    .catch(err => {
      console.log(err);
    })
    .done(() => {
      console.log('Finished');
    });
};
export default fetchAllCommits('./');
