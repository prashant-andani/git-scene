
<template>
  <div id="app">
    <div class="header">Git Repo Dashboard</div>
    <div class="dashboard">
      <div>
        <HelloWorld/>
        <Commits :commits="commits"></Commits>
      </div>
      <div>
        <CommitHistory :data="commits_count"></CommitHistory>
        <Contributors :data="contributors"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueUi from '@vue/ui';
import '@vue/ui/dist/vue-ui.css';
import moment from 'moment';
import json from './../data/dashboard.json';
import commits_count from './../data/commits_count.json';
import commits from './../data/commits.json';

import HelloWorld from './components/HelloWorld.vue';
import Contributors from './components/Contributors.vue';
import CommitHistory from './components/CommitHistory.vue';
import Commits from './components/Commits.vue';

Vue.use(VueUi);

export default {
  name: 'app',
  components: {
    HelloWorld,
    Contributors,
    CommitHistory,
    Commits
  },
  data: function() {
    return {
      contributors: json.authors,
      commits,
      commits_count
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  padding: 16px;
  background: #40b988;
  color: white;
  font-size: 20px;
}
.dashboard {
  display: flex;
}
.box {
  margin: 20px;
  padding: 16px;
  background: #e4f5ef;
  border-radius: 3px;
}
.label {
  color: #9bb2c8;
  font-size: 20px;
}
</style>
