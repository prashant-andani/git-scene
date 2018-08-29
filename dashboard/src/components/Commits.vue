<template>
  <div>

    <!-- List 10 Commits -->
    <div class="box contributors-list">
      <div class="header-label">Last 10 commits</div>
      <div class="content contrib-content">
        <div class="list">
          <div v-for="(commit, count) in commits" v-if="count < 10" class="commit" v-bind:key="$index">
            <div>{{commit.message}}</div>
            <div class="label">{{commit.author}}</div>
            <div>{{moment(commit.date).fromNow()}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Commits',
  props: {
    commits: Object
  },
  data: () => {
    return { moment };
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
.header-label {
  color: #9bb2c8;
  font-size: 20px;
}
.label {
  color: #9bb2c8;
  font-size: 18px;
}
.value {
  color: #2c3e50;
  font-size: 24px;
}
.info-block {
  text-align: center;
}
.commit {
  border-bottom: 1px solid #9bb2c8;
  padding: 20px;
}
</style>
