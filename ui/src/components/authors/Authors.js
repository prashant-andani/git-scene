import React from 'react';
import PropTypes from 'prop-types';

const renderAuthors = data => {
  return Object.keys(data).map(author => (
    <tr>
      <td>{author}</td>
      <td>{data[author]}</td>
    </tr>
  ));
};
const Authors = props => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Commits</th>
          </tr>
        </thead>
        <tbody>{renderAuthors(props.data)}</tbody>
      </table>
    </div>
  );
};

Authors.propTypes = {};

Authors.defaultProps = {};

export default Authors;
