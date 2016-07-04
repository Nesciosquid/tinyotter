import React from 'react';
import { WordTable } from './wordTable.jsx';
import { OtterPause } from './otterPause.jsx';
import { PaneCard } from './paneCard.jsx';

export const WordPane = ({ rows, minCount }) => {
  let content;
  if (rows.length > 0) {
    content = <WordTable rows={rows} />;
  } else content = <OtterPause />;
  return (
    <PaneCard title={`Words found more than ${minCount} times:`}>
      {content}
    </PaneCard>
  );
};

WordPane.propTypes = {
  rows: React.PropTypes.array,
  minCount: React.PropTypes.number,
};
