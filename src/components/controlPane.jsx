import React from 'react';
import { CardText, Slider } from 'react-mdl';
import { PaneCard } from './paneCard.jsx';
import { Pie } from './pie.jsx';

export const ControlPane = ({ max, min, minCount, skipped, total, rows }, { store }) => {
  const update = (event) => {
    store.dispatch({
      type: 'SET_MIN_COUNT',
      count: parseInt(event.target.value, 10),
    });
  };
  const disableSlider = (rows.length === 0);
  return (
    <PaneCard title="Controls">
      <div>
        <CardText>
          Adjust the slider to change the minimum word count.
        </CardText>
        <Slider
          disabled={disableSlider}
          min={min} max={max}
          value={minCount}
          onChange={update}
        />
        <div style={{ margin: 'auto', width: '350px', height: '300px' }} >
          <Pie wordCounts={rows} />
        </div>
        <div style={{ height: '10px' }}></div>
      </div>
    </PaneCard>
  );
};

ControlPane.propTypes = {
  max: React.PropTypes.number,
  min: React.PropTypes.number,
  minCount: React.PropTypes.number,
  skipped: React.PropTypes.number,
  total: React.PropTypes.number,
  rows: React.PropTypes.array,
};

ControlPane.contextTypes = {
  store: React.PropTypes.object,
};
