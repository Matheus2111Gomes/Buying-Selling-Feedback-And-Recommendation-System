<template>
    <div class="feedback-form">
      <h2>Send Feedback</h2>
      <form @submit.prevent="submitFeedback">
        <div>
          <label for="userId">User:</label>
          <input type="text" v-model="feedback.userId" required />
        </div>
        <div>
          <label for="comment">Comment:</label>
          <textarea v-model="feedback.comment" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../axios';
  
  export default {
    data() {
      return {
        feedback: {
          userId: '',
          comment: '',
        },
      };
    },
    methods: {
      async submitFeedback() {
        try {
          await apiClient.post('/feedback', this.feedback);
          alert('Feedback sended');
          this.feedback.userId = '';
          this.feedback.message = '';
          this.$emit('feedbackSent');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .feedback-form {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>