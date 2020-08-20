<template>
  <div
    class="card w-25 candidate-card p-3 m-2"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <h3>{{ details.name }}</h3>
    <b>{{ details.college }}</b>
    <p>{{ details.email_id }}</p>
  </div>
</template>

<script>
export default {
  props: ["details"],
};
</script>

<style>
.candidate-card {
  min-width: 200px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
}
.candidate-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
</style>