import React from 'react';
import PropTypes from 'prop-types';

const renderList = data => {
  return Object.keys(data).map(file => (
    <tr>
      <td>{file}</td>
      <td className="count">{data[file]}</td>
    </tr>
  ));
};
const CommitCountList = props => {
  return (
    <div className="authors-list">
      <table>
        <thead>
          <tr>
            <th>Files</th>
            <th>Commit Count</th>
          </tr>
        </thead>
        <tbody>{renderList(props.data)}</tbody>
      </table>
    </div>
  );
};

CommitCountList.propTypes = {};

CommitCountList.defaultProps = {};

export default CommitCountList;
