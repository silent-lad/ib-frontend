<template>
  <div class="interview-card bg-white p-3 m-2">
    <button class="edit-button" @click="$emit('on-edit')"></button>
    <button class="delete-button" @click="$emit('on-delete')"></button>
    <p>
      {{ new Date(details.start_time).toLocaleString() }} -
      {{ new Date(details.end_time).toLocaleString() }}
    </p>
    <p class="text-secondary font-weight-bold m-0">Interviewees</p>
    <ol>
      <li v-for="candidate in details.candidates" :key="candidate.candidate_id">
        {{ candidate.name }}
      </li>
    </ol>
    <p class="text-secondary font-weight-bold m-0">Interviewer</p>
    <p>{{ details.user.name }}</p>
  </div>
</template>

<script>
export default {
  props: ["details"],
};
</script>

<style>
.interview-card {
	position: relative;
	width: 250px;
  cursor: pointer;
	border: none;
	border-radius: 10px;
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease-in-out;
}
/* .interview-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
} */
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 45px;
  width: 45px;
  background-color: red;
  background-image: url(../assets/icons/delete.webp);
  background-size: cover;
  border: none;
  border-radius: 50%;
  transition: all 200ms ease-in-out;
}
.edit-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 45px;
  width: 45px;
  background-color: grey;
  background-image: url(../assets/icons/edit.svg);
  background-size: cover;
  border: none;
  border-radius: 50%;
  transition: all 200ms ease-in-out;
}
.edit-button:hover {
  transform: scale(1.05);
}
.edit-button:focus {
  outline: none;
}
</style>