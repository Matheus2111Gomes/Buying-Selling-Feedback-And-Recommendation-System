<template>
    <div class="feedback-list">
      <h2>Lista de Feedbacks</h2>
      <ul>
        <li v-for="feedback in feedbacks" :key="feedback.id">
          <p><strong>User:</strong> {{ feedback.userId }}</p>
          <p><strong>Comment:</strong> {{ feedback.comment }}</p>
          <button @click="deleteFeedback(feedback.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import apiClient from '../axios';
  
  export default {
    data() {
      return {
        feedbacks: [],
      };
    },
    methods: {
      async fetchFeedbacks() {
        try {
          const response = await apiClient.get('/feedback');
          this.feedbacks = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteFeedback(id) {
        try {
          await apiClient.delete(`/feedback/${id}`);
          alert('Feedback deleted');
          this.fetchFeedbacks();
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.fetchFeedbacks();
    },
  };
  </script>
  
  <style scoped>
  .feedback-list {
    max-width: 800px;
    margin: 20px auto;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 4px;
  }
  </style>