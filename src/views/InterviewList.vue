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
    isLoading: false,
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
    axios
      .get("http://localhost:8081/scheduled_interview")
      .then((result) => {
        console.log(result);

        result.data.forEach((record) => {
          var flag = false;
          for (var i = 0; i < this.formatted_interviews.length; i++) {
            console.log("debug");
            var interview = this.formatted_interviews[i];
            if (record.interview_id == interview.interview_id) {
              interview.candidates.push({
                name: record.name,
                college: record.college,
                email_id: record.email_id,
              });
              flag = true;
              break;
            }
          }
          if (!flag) {
            var user = {
              company: record.company,
              name: record.user_name,
              email: record.user_email,
              user_id: record.user_id,
            };
            var candidate = {
              name: record.name,
              email: record.email_id,
              candidate_id: record.c_id,
            };
            this.formatted_interviews.push({
              candidates: [candidate],
              start_time: record.start_time,
              end_time: record.end_time,
              interview_id: record.interview_id,
              user: user,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // if (!localStorage.getItem("interviews")) {
    //   this.isLoading = true;
    // } else {
    //   this.isLoading = false;
    //   this.formatted_interviews = JSON.parse(
    //     localStorage.getItem("interviews")
    //   );
    // }
    // Promise.all([
    //   axios.get("https://ib-backend-server.herokuapp.com/interview"),
    //   axios.get("https://ib-backend-server.herokuapp.com/candidates"),
    //   axios.get("https://ib-backend-server.herokuapp.com/users"),
    // ]).then((values) => {
    //   var interview_response = values[0];
    //   var candidates = values[1];
    //   var users = values[2];

    //   this.interviews = interview_response.data.interviews;
    //   this.schedule = interview_response.data.schedule;

    //   this.candidates = candidates.data;

    //   this.users = users.data;

    //   var cacheInterviews = [];
    //   this.interviews.forEach((interview) => {
    //     var user = this.users.find((el) => el.user_id == interview.user_id);
    //     var schedules = this.schedule.filter(
    //       (el) => el.interview_id == interview.interview_id
    //     );
    //     var candidates = [];
    //     schedules.forEach((sched) => {
    //       candidates.push(
    //         this.candidates.find((el) => el.candidate_id == sched.candidate_id)
    //       );
    //     });
    //     cacheInterviews.push({
    //       interview_id: interview.interview_id,
    //       start_time: interview.start_time,
    //       end_time: interview.end_time,
    //       user: user,
    //       candidates: candidates,
    //     });
    //   });
    //   this.formatted_interviews = cacheInterviews;
    //   localStorage.setItem(
    //     "interviews",
    //     JSON.stringify(this.formatted_interviews)
    //   );
    //   this.isLoading = false;
    // });
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