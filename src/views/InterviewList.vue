<template>
  <div class="interviews-container container py-3">
    <div class="heading mb-2">
      <h2>Upcoming Interview</h2>
    </div>
    <Loader v-if="isLoading"></Loader>
    <div
      class="interviews-list row py-3 mx-2"
      v-else-if="editingInterview == null"
    >
      <InterviewCard
        v-for="interview in formatted_interviews"
        :key="interview.id"
        :details="interview"
        @on-edit="editInterview(interview.interview_id)"
        @on-delete="deleteInterview(interview.interview_id)"
      />
    </div>
    <div v-else>
      <EditInterview
        :interview="editingInterview"
        @on-confirm="onEditConfirm"
        @on-delete="deleteInterview(editingInterview.id)"
        @on-cancel="onEditCancel"
      />
    </div>
  </div>
</template>

<script>
import InterviewCard from "@/components/InterviewCard";
import EditInterview from "@/components/EditInterview";
import Loader from "@/components/Loader";
import axios from "axios";

export default {
  components: {
    InterviewCard,
    EditInterview,
    Loader,
  },
  data: () => ({
    interviews: [],
    schedule: [],
    candidates: [],
    users: [],
    formatted_interviews: [],
    editingInterview: null,
    isLoading: true,
  }),
  methods: {
    editInterview(interview_id) {
      var interview = this.formatted_interviews.find(
        (el) => el.interview_id == interview_id
      );
      this.editingInterview = JSON.parse(JSON.stringify(interview));
    },
    onEditConfirm() {
      this.isLoading = true;
      axios
        .patch(
          `https://ib-backend-server.herokuapp.com/interview/${this.editingInterview.interview_id}`,
          {
            start_time: new Date(this.editingInterview.start_time).valueOf(),
            end_time: new Date(this.editingInterview.end_time).valueOf(),
          }
        )
        .then((candidates) => {
          let index = this.formatted_interviews.findIndex((interview) => {
            return (
              this.formatted_interviews.interview_id ==
              this.editingInterview.interview_id
            );
          });
          this.formatted_interviews[index] = this.editingInterview;
          this.editingInterview = null;
          this.isLoading = false;
        });
    },
    onEditCancel() {
      this.editingInterview = null;
    },
    deleteInterview(interview_id) {
      this.isLoading = true;
      axios
        .delete(
          `https://ib-backend-server.herokuapp.com/interview/${interview_id}`
        )
        .then((candidates) => {
          this.formatted_interviews.splice(
            this.formatted_interviews.findIndex(
              (el) => el.interview_id == interview_id
            ),
            1
          );
          this.isLoading = false;
        });
    },
  },
  created() {
    Promise.all([
      axios.get("https://ib-backend-server.herokuapp.com/interview"),
      axios.get("https://ib-backend-server.herokuapp.com/candidates"),
      axios.get("https://ib-backend-server.herokuapp.com/users"),
    ]).then((values) => {
      var interview_response = values[0];
      var candidates = values[1];
      var users = values[2];

      this.interviews = interview_response.data.interviews;
      this.schedule = interview_response.data.schedule;

      this.candidates = candidates.data;

      this.users = users.data;
      this.interviews.forEach((interview) => {
        var user = this.users.find((el) => el.user_id == interview.user_id);
        var schedules = this.schedule.filter(
          (el) => el.interview_id == interview.interview_id
        );
        var candidates = [];
        schedules.forEach((sched) => {
          candidates.push(
            this.candidates.find((el) => el.candidate_id == sched.candidate_id)
          );
        });
        this.formatted_interviews.push({
          interview_id: interview.interview_id,
          start_time: interview.start_time,
          end_time: interview.end_time,
          user: user,
          candidates: candidates,
        });
        this.isLoading = false;
      });
    });
  },
};
</script>

<style>
.heading {
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  background: rgba(255, 133, 19, 0.281);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.212);
}
</style>