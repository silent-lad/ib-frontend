<template>
  <div class="interviews-container container py-3">
    <h3>Upcoming Interviews</h3>
    <div class="interviews-list row">
      <InterviewCard
        v-for="interview in formatted_interviews"
        :key="interview.id"
        :details="interview"
        @on-edit="editInterview(interview.interview_id)"
        @on-delete="deleteInterview(interview.interview_id)"
      />
    </div>
  </div>
</template>

<script>
import InterviewCard from "@/components/InterviewCard";
import axios from "axios";

export default {
  components: {
    InterviewCard,
  },
  data: () => ({
    interviews: [],
    schedule: [],
    candidates: [],
    users: [],
    formatted_interviews: [],
  }),
  methods: {
    editInterview(index) {
      console.log(this.interviews[index]);
    },
    deleteInterview(interview_id) {
      axios
        .delete(`http://localhost:8081/interview/${interview_id}`)
        .then((candidates) => {
          console.log(candidates);
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
      });
    });
  },
};
</script>

<style>
.interviews-container {
}
</style>