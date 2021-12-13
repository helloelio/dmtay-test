import { createStore } from 'vuex';

const axios = require('axios');

export default createStore({
  state: {
    questions: [],
    loading: false,
    rightAnswers: [],
  },
  getters: {
    questions: (state) => state.questions,
    rightAnswers: (state) => state.rightAnswers,
    loading: (state) => state.loading,
  },
  mutations: {
    setAnswer(state, idx) {
      // eslint-disable-next-line array-callback-return
      state.questions = state.questions.filter(
        (item) => state.questions[idx] !== item,
      );
    },
    setQuestions(state, value) {
      state.questions = value.response.data.results;
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setRightAnswers(state, { value }) {
      state.rightAnswers.push(value);
    },
  },
  actions: {
    async getQuestions() {
      await axios
        .get('https://opentdb.com/api.php?amount=10')
        .then((response) => {
          // this.state.questions = response.data.results;
          this.commit('setQuestions', { response });
          this.commit('setLoadingTrue');
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {});
    },
    /* eslint-disable */
    setRightAnswer(state, { value }) {
      axios({
        method: 'post',
        url: '../services/Answers.json',
        data: { answer: value },
      })
        .then((response) => {
          this.commit('setRightAnswers', { value });
        })
        .catch((error) => {
          this.commit('setRightAnswers', { value });
        });
    },
  },
  created() {
    this.getQuestions();
  },
  modules: {},
});
