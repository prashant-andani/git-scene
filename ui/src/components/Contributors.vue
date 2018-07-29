<template>
  <div>

    <!-- Contributors -->
    <div class="box contributors-list">
      <div class="label">Contributors</div>
      <div class="content contrib-content">
        
        <div class="list">
          <div class="author" v-for="(count, author) in data" v-bind:key="$index" v-if="author !== ''">
            <div class="vue-ui-icon"><svg><use xlink:href="#ic_star_24px"></use></svg></div>
            {{author}} - {{count}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contributors',
  props: {
    data: Object
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
.author {
  padding: 10px;
}
.vue-ui-icon {
  display: inline-block;
  width: 18px;
  height: 22px;
  color: #40b988;
  vertical-align: bottom;
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
