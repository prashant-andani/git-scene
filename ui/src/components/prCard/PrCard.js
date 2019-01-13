import React from 'react';

import { Tooltip, Icon } from 'antd';
import { ChartCard, MiniBar } from 'ant-design-pro/lib/Charts';

const CommitsCard = props => {
  return (
    <ChartCard
      title="Pull Requests"
      action={
        <Tooltip title="Total pull requests">
          <Icon type="exclamation-circle-o" />
        </Tooltip>
      }
      total={props.totalCount}
      contentHeight={46}
    >
      {/* <MiniBar height={46} data={props.total} /> */}
    </ChartCard>
  );
};

CommitsCard.propTypes = {};

CommitsCard.defaultProps = {};

export default CommitsCard;
