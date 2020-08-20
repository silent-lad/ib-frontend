<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Create Interview</router-link> |
      <router-link to="/interviews">Interviews</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
}
#app {
  min-height: 100vh;
  /* background: rgb(240, 240, 240); */
}
</style>
