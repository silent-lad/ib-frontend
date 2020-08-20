<template>
  <div class="edit-interview">
    <b>Interviewees</b>
    <ol>
      <li v-for="candidate in interview.selected" :key="candidate.id">
        {{ candidate.name }}
      </li>
    </ol>
    <b>Interviewer: </b>
    <p>{{ interview.interviewer }}</p>
    <form @submit.prevent="onConfirmClick" class="time-selection">
      <div class="form-group my-2">
        <label for="start-time">Start Time</label>
        <input
          id="start-time"
          class="form-control"
          type="datetime-local"
          :min="dateTimeNow"
          v-model="interview.startTime"
          required
        />
      </div>
      <div class="form-group my-2">
        <label for="end-time">End Time</label>
        <input
          id="end-time"
          class="form-control"
          type="datetime-local"
          :min="interview.startTime"
          v-model="interview.endTime"
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
    dateTimeStart() {
      if (this.interview.startTime == null) return undefined;

      return this.utcToInputString(this.interview.startTime);
    },
  },
  created() {
    this.interview.startTime = this.utcToInputString(this.interview.startTime);
    this.interview.endTime = this.utcToInputString(this.interview.endTime);
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