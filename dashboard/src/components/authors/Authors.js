import React from 'react';
import PropTypes from 'prop-types';

const Authors = props => {
  return (
    <div>
      <table>
        <tr>
          <th>Author</th>
          <th>Commits</th>
        </tr>
        <tr />
      </table>
    </div>
  );
};

Authors.propTypes = {};

Authors.defaultProps = {};

export default Authors;
