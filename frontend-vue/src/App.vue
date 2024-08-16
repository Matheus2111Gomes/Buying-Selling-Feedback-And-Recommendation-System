<template>
  <div id="app">
    <header>
      <h1>Feedback System</h1>
    </header>
    <main>
      <FeedbackForm @feedbackSent="fetchFeedbacks"/>
      <FeedbackList :feedbacks="feedbacks"/>
    </main>
  </div>
</template>

<script>
import FeedbackForm from './components/Feedback/FeedbackForm.vue';
import FeedbackList from './components/Feedback/FeedbackList.vue';
import apiClient from './configs/axios';

export default {
  name: 'App',
  components: {
    FeedbackForm,
    FeedbackList
  },
  data() {
    return {
      feedbacks: []
    };
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const response = await apiClient.get('/feedback');
        this.feedbacks = response.data;
      } catch (error) {
        console.error('Erro ao buscar feedbacks:', error);
      }
    }
  },
  created() {
    this.fetchFeedbacks();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  background-color: #42b983;
  padding: 10px;
  color: white;
}

main {
  padding: 20px;
}

img {
  width: 100px; /* Ajuste o tamanho da imagem se necessário */
}
</style>