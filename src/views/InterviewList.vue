<template>
	<div class="interviews-container container py-3">
		<h3>Upcoming Interviews</h3>
		<div class="interviews-list row">
			<InterviewCard v-for="(interview, i) in interviews" :key="interview.id" :details="interview" @on-edit="editInterview(i)" />
		</div>
	</div>
</template>

<script>
import InterviewCard from '@/components/InterviewCard';

export default {
	components: {
		InterviewCard
	},
	data: () => ({
		interviews: [
			{
				id: 0,
				startTime: 1597906539,
				endTime: 1597906580,
				interviewer: "XYZ",
				selected: [
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
				]
			},
			{
				id: 1,
				startTime: 1597907539,
				endTime: 1597907580,
				interviewer: "XYZ",
				selected: [
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
				]
			}
		]
	}),
	methods: {
		editInterview(index) {
			console.log(this.interviews[index]);
		}
	}
}
</script>

<style>
.interviews-container {

}
</style>