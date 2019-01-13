import React from 'react';

import { Pie } from 'ant-design-pro/lib/Charts';
import { Card } from 'antd';

const CommitsShare = props => {
  return (
    <Card
      className="size-md"
      title="Commits Share"
      icon="chart-pie"
      bordered={false}
    >
      <Pie
        hasLegend
        title="Commits"
        subTitle="Commits share"
        data={props.data}
        height={294}
      />
    </Card>
  );
};
export default CommitsShare;
