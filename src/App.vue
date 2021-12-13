<template>
  <div v-if="loading">
    <QuestionItem :questions="this.questions" />
    <ResultItem :questions="this.questions" :rightAnswers="this.rightAnswers" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionItem from './components/QuestionItem.vue';
import ResultItem from './components/ResultItem.vue';

export default {
  name: 'App',
  components: {
    QuestionItem,
    ResultItem,
  },

  computed: {
    ...mapGetters(['questions', 'loading', 'rightAnswers']),
  },

  created() {
    this.$store.dispatch('getQuestions');
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}
.question {
  background-color: hsla(210, 29%, 24%, 0.9);
  color: white;
  border: 1px solid black;
  border-radius: 14px;
  margin-bottom: 10px;
  text-align: left;
  padding: 20px;
  font-size: 1.3rem;
  box-shadow: 0px 0px 10px 0px black;
  &__question,
  &__difficulty,
  &__category,
  &__answers {
    filter: drop-shadow(1px 1px 5px black);
    margin-bottom: 5px;
  }
  &__input {
    font-size: 1rem;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 2px solid black;
    padding: 5px;
    width: 50%;
  }
  &__button {
    font-size: 1rem;
    font-weight: bold;
    width: 6rem;
    padding: 5px;
    border: 2px solid black;
    border-left: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
.right-answers {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #2c3e50;
  filter: drop-shadow(1px 1px 5px black);
  color: white;
  font-size: 2rem;
  &__link {
    display: block;
    align-self: center;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    background-color: blue;
    color: white;
    transition: 0.3s ease;
  }
  &__link:hover {
    background-color: white;
    color: blue;
  }
}

.right-answers-count {
  align-self: center;
  background-color: green;
  font-size: 5rem;
}
.wrong-answers-count {
  align-self: center;
  padding: 5px 10px;
  background-color: red;
  font-size: 5rem;
}
</style>
