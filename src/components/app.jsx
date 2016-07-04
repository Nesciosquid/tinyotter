import React from 'react';
import { NavBar } from './navBar.jsx';
import { Grid, Cell } from 'react-mdl';
import { WordPane } from './wordPane.jsx';
import { ControlPane } from './controlPane.jsx';

export const TinyOtterApp = (props, { store }) => {
  const state = store.getState();
  const words = state.sortedWords;
  const rows = [];
  const passedWords = [];
  let uniqueWords = 0;
  let totalWords = 0;
  let skippedWords = 0;
  let minCount = 5;
  let max = 5;
  let min = 1;
  if (words && words.length > 0) {
    minCount = state.minCount;
    max = words[0][1];
    min = words[words.length - 1][1];

    words.forEach((word) => {
      const count = word[1];
      if (count >= minCount) {
        uniqueWords ++;
        totalWords += count;
        passedWords.push(word);
      } else {
        skippedWords ++;
      }
    });
    passedWords.forEach((word) => {
      const count = word[1];
      const text = word[0];
      const freq = count / totalWords;
      const percentage = `${(freq * 100).toFixed(2)}%`;
      rows.push({
        count,
        word: text,
        frequency: freq,
        percentage,
      });
    });
  }

  const className = 'tinyotter-app';

  return (
    <NavBar>
      <div className={className}>
        <Grid>
          <Cell col={6} style={{ marginRight: 'auto', marginLeft: 'auto' }}>
            <ControlPane
              max={max}
              min={min}
              minCount={minCount}
              skipped={skippedWords}
              total={totalWords}
              rows={rows}
            />
          </Cell>
          <Cell col={6} style={{ marginRight: 'auto', marginLeft: 'auto' }}>
            <WordPane rows={rows} minCount={minCount} />
          </Cell>
        </Grid>
      </div>
    </NavBar>
  );
};

TinyOtterApp.propTypes = {
  sortedWords: React.PropTypes.array,
};

TinyOtterApp.contextTypes = {
  store: React.PropTypes.object,
};
