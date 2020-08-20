<template>
  <div class="create-interview-container container py-3">
		<div class="select-container">
			<h4>Select candidates</h4>
			<div class="row p-2 bg-light">
				<CandidateCard v-for="(candidate, i) in candidates" :key="candidate.id" :details="candidate" @click="selectCandidate(i)" />
			</div>
		</div>
		<div class="selected-container my-5">
			<h4>Selected candidates</h4>
			<div class="row p-2 bg-light">
				<CandidateCard v-for="(candidate, i) in selected" :key="candidate.id" :details="candidate"  @click="unselectCandidate(i)" />
			</div>
			<form @submit.prevent="createInterview" class="time-selection">
				<div class="form-group my-2">
					<label for="start-time">Start Time</label>
					<input id="start-time" class="form-control" type="datetime-local" :min="minDate" v-model="startTime" required>					
				</div>
				<div class="form-group my-2">
					<label for="end-time">End Time</label>
					<input id="end-time" class="form-control" type="datetime-local" :min="minDate" v-model="endTime" required>
				</div>
				<button class="btn btn-primary my-2" :disabled="selected.length == 0 || startTime == null || endTime == null">Create Interview</button>
			</form>
		</div>
  </div>
</template>

<script>
import CandidateCard from '@/components/CandidateCard';

export default {
	name: 'CreateInterview',
	components: {
		CandidateCard
	},
	data: () =>({
		candidates: [
			{
				id: 0,
				name: "ABC",
				college: "USICT",
				email: "abcd@efg.com"
			},
			{
				id: 1,
				name: "DEF",
				college: "IIT",
				email: "def@efg.com"
			},
		],
		selected: [],
		startTime: null,
		endTime: null,
	}),
	computed: {
		minDate() {
			console.log(new Date((Date.now())).toISOString());
			return Date.now();
		}
	},
	methods: {
		selectCandidate(index) {
			this.selected.push(this.candidates[index]);
			this.candidates.splice(index, 1);
		},
		unselectCandidate(index) {
			this.candidates.push(this.selected[index]);
			this.selected.splice(index, 1);
		},
		createInterview() {
			let interviewDetails = {

			}
		}
	}
}
</script>

<style>
.create-interview-container {
	
}
.select-container, .selected-container {

}
.select-container .row, .selected-container .row {
	min-height: 100px;
}
</style>
