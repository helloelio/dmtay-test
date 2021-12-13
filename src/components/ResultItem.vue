<template>
  <div>
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
export default {
  name: 'ResultItem',
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
    rightAnswers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
