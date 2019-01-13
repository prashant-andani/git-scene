import React from 'react';

import { Tooltip, Icon } from 'antd';
import { ChartCard, MiniBar, Field } from 'ant-design-pro/lib/Charts';

const CommitsCard = props => {
  return (
    <ChartCard
      title="Total Commits"
      action={
        <Tooltip title="Total commits so far">
          <Icon type="exclamation-circle-o" />
        </Tooltip>
      }
      bordered={false}
      total={props.totalCount}
      contentHeight={46}
      footer={<Field label="Avg. Daily commits" value={props.avgCommits} />}
    >
      <MiniBar height={46} data={props.commits} />
    </ChartCard>
  );
};

CommitsCard.propTypes = {};

CommitsCard.defaultProps = {};

export default CommitsCard;
