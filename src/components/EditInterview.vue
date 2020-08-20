<template>
  <div class="edit-interview">
    <p class="text-secondary font-weight-bold m-0">Interviewees</p>
    <ol>
      <li
        v-for="candidate in interview.candidates"
        :key="candidate.candidate_id"
      >
        {{ candidate.name }}
      </li>
    </ol>
    <p class="text-secondary font-weight-bold m-0">Interviewer</p>
    <p>{{ interview.user.name }}</p>
    <form @submit.prevent="onConfirmClick" class="time-selection">
      <div class="form-group my-2">
        <label for="start-time">Start Time</label>
        <input
          id="start-time"
          class="form-control"
          type="datetime-local"
          :min="dateTimeNow"
          v-model="interview.start_time"
          required
        />
      </div>
      <div class="form-group my-2">
        <label for="end-time">End Time</label>
        <input
          id="end-time"
          class="form-control"
          type="datetime-local"
          :min="interview.start_time"
          v-model="interview.end_time"
          required
        />
      </div>
      <button class="btn btn-primary m-1">Confirm</button>
      <button type="button" class="btn btn-danger m-1" @click="onDeleteClick">
        Delete
      </button>
      <button
        type="button"
        class="btn btn-secondary m-1"
        @click="onCancelClick"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["interview"],
  computed: {
    dateTimeNow() {
      return this.utcToInputString(Date.now());
    },
  },
  created() {
    this.interview.start_time = this.utcToInputString(
      this.interview.start_time
    );
    this.interview.end_time = this.utcToInputString(this.interview.end_time);
  },
  methods: {
    utcToInputString(timestamp) {
      let datetimeSegments = new Date(timestamp).toISOString().split(":");
      let datetime = datetimeSegments[0] + ":" + datetimeSegments[1];
      // console.log(timestamp, datetime);
      return datetime;
    },
    onConfirmClick() {
      this.$emit("on-confirm");
    },
    onDeleteClick() {
      this.$emit("on-delete");
    },
    onCancelClick() {
      this.$emit("on-cancel");
    },
  },
};
</script>

<style>
</style>