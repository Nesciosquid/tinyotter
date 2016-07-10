const initialState = {
  sortedWords: [],
  minCount: 25,
};

const setWords = (state, newWords) => (
  Object.assign({}, state, { sortedWords: newWords })
);

const setMinCount = (state, newCount) => (
  Object.assign({}, state, { minCount: newCount })
);

export const updateWords = (state = initialState, action) => {
  switch (action.type) {
    case ('SET_WORDS'):
      return setWords(state, action.words);
    case ('SET_MIN_COUNT'):
      return setMinCount(state, action.count);
    default:
      return state;
  }
};
