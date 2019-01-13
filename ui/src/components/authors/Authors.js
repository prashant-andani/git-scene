import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const renderAuthors = data => {
  return Object.keys(data).map(author => (
    <tr>
      <td>{author}</td>
      <td className="count">{data[author]}</td>
    </tr>
  ));
};
const Authors = props => {
  return (
    <Card title="Contributions" extra={<a href="#" />} style={{ width: 300 }}>
      <div className="authors-list">
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
    </Card>
  );
};

Authors.propTypes = {};

Authors.defaultProps = {};

export default Authors;
