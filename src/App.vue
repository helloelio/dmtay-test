<template>
  <div v-if="loading">
    <div class="question" v-for="(question, idx) in this.questions" :key="idx">
      <div class="question__category">
        <h4>Category:</h4>
        {{ question.category }}
      </div>
      <div
        class="question__difficulty"
        :style="{
          color: this.difficultyColor[question.difficulty],
        }"
      >
        <h4>Difficulty:</h4>
        {{ question.difficulty }}
      </div>
      <div class="question__question">
        <h4>Question:</h4>
        {{ question.question }}
      </div>
      <div>
        <div class="question__answers">
          <h4>Answer options:</h4>
          {{ question.correct_answer }},
          {{ question.incorrect_answers.join(', ') }}
        </div>
      </div>
      <form
        action=""
        @submit.prevent="
          setRightAnswer(
            question.correct_answer,
            this.$refs.value[idx].value,
            idx,
          )
        "
      >
        <input
          class="question__input"
          ref="value"
          type="text"
          placeholder="Write your answer... "
        />
        <input class="question__button" type="submit" value="Send" />
      </form>
    </div>
    <div
      class="right-answers"
      v-if="questions.length === 0 && this.rightAnswers.length > 5"
    >
      <div>Good result! You have:</div>
      <div class="right-answers-count">
        {{ rightAnswers.length }}
      </div>
      <div>correct answers.</div>
      <a class="right-answers__link" href="/">Try again</a>
    </div>
    <div
      class="right-answers"
      v-show="questions.length === 0 && this.rightAnswers.length < 5"
    >
      <div>Bad result! You have:</div>
      <div class="wrong-answers-count">
        {{ rightAnswers.length }}
      </div>
      <div>correct answers.</div>
      <a class="right-answers__link" href="/">Try again</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      difficultyColor: {
        easy: 'green',
        medium: 'yellow',
        hard: 'red',
      },
    };
  },

  computed: {
    ...mapGetters(['questions', 'loading', 'rightAnswers']),
  },

  created() {
    this.$store.dispatch('getQuestions');
  },

  methods: {
    setRightAnswer(correct, value, idx) {
      if (correct.toLowerCase() === value.toLowerCase()) {
        this.correctAnswersCount += 1;
        this.$store.dispatch('setRightAnswer', { value });
        this.$refs.value[idx].value = '';
      }
      this.$store.commit('setAnswer', idx);
      this.$refs.value[idx].value = '';
    },
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
