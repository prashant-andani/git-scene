<script>
import Vue from 'vue';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

Vue.use(VueChartkick, { adapter: Chart });
export default {
  name: 'CommitHistory',
  props: {
    data: Object
  }
};
</script>
<template>
  <div class="box contributors-list">
    <div class="label">Commit History</div>
    <div class="commit-history">
      <line-chart :data="data"></line-chart>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  margin: 20px;
  padding: 16px;
  background: #e4f5ef;
  border-radius: 3px;
}
.commit-history {
  width: 550px;
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
