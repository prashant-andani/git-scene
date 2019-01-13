import React from 'react';
import PropTypes from 'prop-types';

const PR = props => {
  let totalPR = 0;
  let counts = {};
  let prWithNoApproval = { count: 0, commits: [] };
  const regex = /\S+[a-z0-9]@[a-z0-9\.]+/gim;
  const list = props.data.map(commit => {
    let msg = commit.message;
    if (msg.includes('(pull request')) {
      totalPR += 1;
      const emails = msg.match(regex);
      if (emails === null) {
        prWithNoApproval.count++;
        prWithNoApproval.commits.push(commit);
        return;
      }
      console.log(emails.length);

      emails.forEach(email => {
        email = email.replace(/</g, '').replace(/>/g, '');
        if (counts[email] === undefined) {
          counts[email] = 1;
        } else {
          counts[email] += 1;
        }
      });
      // return <div className="pr">{commit.message}</div>;
    }
  });
  console.log(totalPR);
  console.log(counts);
  console.log(prWithNoApproval);
  return (
    <div>
      <div>
        Total PRs <strong>{totalPR}</strong>
      </div>
      <div>
        PRs with no approvals <strong>{prWithNoApproval.count}</strong>
      </div>
    </div>
  );
};

PR.propTypes = {};

PR.defaultProps = {};

export default PR;
