<template>
  <div id="app">
    <div class="side-bar">
      <h5 class="my-4">Interview Creation Portal</h5>
      <ul class="side-list">
        <router-link
          tag="li"
          :class="selectedRoute == '/' ? 'selected' : ''"
          class="side-item"
          to="/"
          >Create Interview</router-link
        >
        <router-link
          tag="li"
          class="side-item"
          :class="selectedRoute == '/interviews' ? 'selected' : ''"
          to="/interviews"
          >Upcoming Interviews</router-link
        >
      </ul>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedRoute() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  height: 100vh;
  display: flex;
}

.side-bar {
  flex: 1;
  height: 100%;
  //   background: rgb(219, 99, 0);
  background: linear-gradient(#f17d11, #f5af19);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  text-align: center;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.3);
  z-index: 10;

  .side-list {
    list-style: none;
    padding: 0;
    margin-top: 30px;

    .side-item {
      padding: 20px 0;
      cursor: pointer;
      &.selected {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
.main-content {
  height: 100%;
  overflow: auto;
  background: #f9f9f9;
  color: black;
  flex: 4;
  width: 100%;
  padding: 20px;
}
</style>
