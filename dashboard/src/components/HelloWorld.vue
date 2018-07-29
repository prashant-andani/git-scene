<template>
  <div>
    <div class="box">
      <div class="content">
        <div class="info-block status">
          <div class="label">Commits</div>
          <div class="value">{{dashboard.totalCommits}}</div>
        </div>
        <div class="info-block status">
          <div class="label">Contributors</div>
          <div class="value">{{Object.keys(dashboard.authors).length}}</div>
        </div>
        <div class="info-block status">
          <div class="label">Branch</div>
          <div class="value">{{dashboard.branch}}</div>
        </div>
        <div class="info-block status">
          <div class="label">Last Commit</div>
          <div class="value">{{dashboard.lastCommit.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import json from './../../data/dashboard.json';
import commits from './../../data/commits.json';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    let dashboard = json;
    let dateFormat = moment(dashboard.lastCommit.date).format('DD-MMM-YYYY');
    dateFormat = moment(dateFormat, 'DD-MMM-YYYY').fromNow();
    dashboard.lastCommit.date = dateFormat;
    return {
      dashboard,
      commits,
      moment,
      chartData: commits
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  margin: 20px;
  padding: 16px;
  background: #e4f5ef;
  border-radius: 3px;
}

.content {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
.contrib-content {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.list {
  float: left;
}
.label {
  color: #9bb2c8;
  font-size: 20px;
}
.value {
  color: #2c3e50;
  font-size: 24px;
}
.info-block {
  text-align: center;
}
</style>
