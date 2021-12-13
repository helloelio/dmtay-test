<template>
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
</template>

<script>
export default {
  name: 'QuestionItem',

  props: {
    questions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      difficultyColor: {
        easy: 'green',
        medium: 'yellow',
        hard: 'red',
      },
    };
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
