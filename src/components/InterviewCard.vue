<template>
	<div class="interview-card card bg-white p-3 m-2">
		<button class="edit-button" @click="$emit('on-edit')"></button>
		<p>{{ new Date(details.startTime).toLocaleString() }} - {{ new Date(details.endTime).toLocaleString() }}</p>
		<b>Interviewees</b>
		<ol>
			<li v-for="candidate in details.selected" :key="candidate.id">{{ candidate.name }}</li>
		</ol>
		<b>Interviewer: </b> 
		<p>{{ details.interviewer }}</p>
	</div>
</template>

<script>
export default {
	props: ["details"],
}
</script>

<style>
.interview-card {
	transition: all 200ms ease-in-out;
}
.interview-card:hover {
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.edit-button {
	position: absolute;
	top: 10px;
	right: 10px;
	height: 35px;
	width: 35px;
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
	outline:none;
}
</style>