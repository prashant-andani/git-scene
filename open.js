var nodegit = require('nodegit');
var Promise = require('promise');
var colors = require('colors/safe');

const getData = repo_path => {
  nodegit.Repository.open(repo_path)
    .then(function(repo) {
      /* Get the current branch. */
      return repo
        .getCurrentBranch()
        .then(function(ref) {
          console.log(colors.magenta('Branch: ' + ref.shorthand()));

          /* Get the commit that the branch points at. */
          return repo.getBranchCommit(ref.shorthand());
        })
        .then(function(commit) {
          /* Set up the event emitter and a promise to resolve when it finishes up. */
          var hist = commit.history(),
            p = new Promise(function(resolve, reject) {
              hist.on('end', resolve);
              hist.on('error', reject);
            });
          hist.start();
          return p;
        })
        .then(function(commits) {
          var authors = {};
          /* Iterate through the last 10 commits of the history. */
          for (var i = 0; i < commits.length; i++) {
            var author = commits[i].author().email();
            if (!authors[author]) {
              authors[author] = 0;
            }
            authors[author] += 1;
          }

          console.log(colors.green('**** Contributors ****'));
          console.log(colors.yellow('-------------------------------------'));
          console.log();
          for (var author in authors) {
            console.log('*', author, '--', colors.green(authors[author]));
          }

          console.log(colors.yellow('-------------------------------------'));
          var totalContributors = Object.keys(authors).length;
          console.log(
            colors.green('No. of Contributors: ' + totalContributors)
          );
          console.log(colors.green('Total Commits: ' + commits.length)); // outputs green text
        });
    })
    .catch(function(err) {
      console.log(err);
    })
    .done(function() {
      console.log('Finished');
    });
};
