<template>
  <div class="create-interview-container container py-3">
    <div class="user-dropdown">
      <h4>Select Interviewer</h4>
      <div class="row p-2 bg-light">
        <select name="" id="" v-model="selected_user">
          <option
            v-for="user in users"
            :key="user.user_id"
            :value="user.user_id"
          >
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="select-container">
      <h4>Select candidates (Click to Select)</h4>
      <div class="row p-2 bg-light">
        <CandidateCard
          v-for="(candidate, i) in remaining_candidates"
          :key="candidate.id"
          :details="candidate"
          @click="selectCandidate(i)"
        />
      </div>
    </div>
    <div class="selected-container my-5">
      <h4>Selected candidates</h4>
      <div class="row p-2 bg-light">
        <CandidateCard
          v-for="(candidate, i) in selected"
          :key="candidate.id"
          :details="candidate"
          @click="unselectCandidate(i)"
        />
      </div>
      <form @submit.prevent="createInterview" class="time-selection">
        <div class="form-group my-2">
          <label for="start-time">Start Time</label>
          <input
            id="start-time"
            class="form-control"
            type="datetime-local"
            :min="minDate"
            v-model="start_time"
            required
          />
        </div>
        <div class="form-group my-2">
          <label for="end-time">End Time</label>
          <input
            id="end-time"
            class="form-control"
            type="datetime-local"
            :min="minDate"
            v-model="end_time"
            required
          />
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
    minDate() {
      console.log(new Date(Date.now()).toISOString());
      return Date.now();
    },
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
      axios
        // .post("https://ib-backend-server.herokuapp.com/interview", {
        .post("https://ib-backend-server.herokuapp.com/interview", {
          start_time: new Date(this.end_time).valueOf(),
          end_time: new Date(this.start_time).valueOf(),
          candidates: this.selected,
          user_id: this.selected_user,
        })
        .then((candidates) => {});
    },
  },
  created() {
    axios
      .get("https://ib-backend-server.herokuapp.com/candidates")
      .then((candidates) => {
        this.candidates = candidates.data;
        this.remaining_candidates = this.candidates;
      });
    axios.get("https://ib-backend-server.herokuapp.com/users").then((users) => {
      this.users = users.data;
      this.selected_user = this.users[0].user_id;
    });
  },
};
</script>

<style>
.create-interview-container {
}
.select-container,
.selected-container {
}
.select-container .row,
.selected-container .row {
  min-height: 100px;
}
</style>
