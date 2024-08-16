<template>
    <div class="home">
      <FeedbackForm @feedbackSent="reloadFeedbacks" />
      <FeedbackList ref="feedbackList" />
    </div>
</template>
  
  <script>
  import FeedbackForm from './components/Feedback/FeedbackForm.vue';
  import FeedbackList from './components/Feedback/FeedbackList.vue';
  
  export default {
    components: {
      FeedbackForm,
      FeedbackList,
    },
    methods: {
      reloadFeedbacks() {
        this.$refs.feedbackList.fetchFeedbacks();
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
    text-align: center;
  }
  </style>