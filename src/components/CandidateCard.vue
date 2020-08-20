<template>
  <div class="candidate-card m-2" v-bind="$attrs" v-on="$listeners">
    <div class="card-body">
      <b>{{ details.name }}</b>
      <p class="text-secondary">{{ details.college }}</p>
      <small class="text-secondary">{{
        details.email_id == "" ? "abc@def.com" : details.email_id
      }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: ["details"],
};
</script>

<style>
.candidate-card {
  width: 250px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease-in-out;
}
.candidate-card:hover {
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
}
</style>
