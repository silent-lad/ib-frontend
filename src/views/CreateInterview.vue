<template>
  <div class="create-interview-container container py-3">
		<h3>Create Interview</h3>
    <div class="user-dropdown my-4">
      <p class="text-secondary font-weight-bold">Select Interviewer</p>
			<select name="" id="" class="form-select" v-model="selected_user">
				<option
					v-for="user in users"
					:key="user.user_id"
					:value="user.user_id"
				>
					{{ user.name }}
				</option>
			</select>
    </div>
    <div class="select-container my-4">
      <p class="text-secondary font-weight-bold m-0">Select candidates (Click to Select)</p>
      <div class="candidates-row p-2">
        <CandidateCard
          v-for="(candidate, i) in remaining_candidates"
          :key="candidate.id"
          :details="candidate"
          @click="selectCandidate(i)"
        />
      </div>
    </div>
    <div class="selected-container my-4">
      <p class="text-secondary font-weight-bold m-0">Candidates Selected</p>
      <div class="selected-row p-2">
        <CandidateCard
          v-for="(candidate, i) in selected"
          :key="candidate.id"
          :details="candidate"
          @click="unselectCandidate(i)"
        />
      </div>
      <form @submit.prevent="createInterview" class="time-selection">
				<div class="form-row">
					<div class="form-group my-2">
						<label class="text-secondary" for="start-time">Start Time</label>
						<input
							id="start-time"
							class="form-control"
							type="datetime-local"
							:min="dateTimeNow"
							v-model="start_time"
							required
						/>
					</div>
					<div class="form-group my-2">
						<label class="text-secondary" for="end-time">End Time</label>
						<input
							id="end-time"
							class="form-control"
							type="datetime-local"
							:min="start_time"
							v-model="end_time"
							required
						/>
					</div>
				</div>
        <button
          class="btn btn-primary my-2"
          :disabled="
            selected.length == 0 || start_time == null || end_time == null
          "
        >
          Create Interview
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CandidateCard from "@/components/CandidateCard";
import axios from "axios";

export default {
  name: "CreateInterview",
  components: {
    CandidateCard,
  },
  data: () => ({
    candidates: [],
    users: [],
    remaining_candidates: [],
    selected: [],
    start_time: null,
    end_time: null,
    selected_user: "",
  }),
  computed: {
    dateTimeNow() {
      return this.utcToInputString(Date.now());
    }
  },
  methods: {
		utcToInputString(timestamp) {
      let datetimeSegments = new Date(timestamp).toISOString().split(":");
      let datetime = datetimeSegments[0] + ":" + datetimeSegments[1];
      // console.log(timestamp, datetime);
      return datetime;
    },
    selectCandidate(index) {
      this.selected.push(this.candidates[index]);
      this.candidates.splice(index, 1);
    },
    unselectCandidate(index) {
      this.candidates.push(this.selected[index]);
      this.selected.splice(index, 1);
    },
    createInterview() {
      axios
        .post("http://localhost:8081/interview", {
          start_time: new Date(this.start_time).valueOf(),
          end_time: new Date(this.end_time).valueOf(),
          candidates: this.selected,
          user_id: this.selected_user,
        })
        .then((candidates) => {});
    },
  },
  created() {
    axios
      .get("http://localhost:8081/candidates")
      .then((candidates) => {
        this.candidates = candidates.data;
        this.remaining_candidates = this.candidates;
      });
    axios.get("http://localhost:8081/users").then((users) => {
      this.users = users.data;
      this.selected_user = this.users[0].user_id;
    });
  },
};
</script>

<style>
.create-interview-container {
}
.candidates-row, .selected-row {
	display: flex;
	flex-wrap: wrap;
}
.form-control, .form-select {
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
	border: none !important;
}
.form-row {
	display: flex;
	flex-wrap: wrap;
}
.form-group {
	margin: 0 10px;
}
.selected-container {
	background: rgb(231, 231, 231);
	padding: 20px;
	border-radius: 10px;
}
</style>
